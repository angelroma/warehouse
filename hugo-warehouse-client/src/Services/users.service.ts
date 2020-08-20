import { User } from "../Interfaces/users.interface";
import { api } from "../Utils/api.util";

export const getAll = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/users/GetAll`)
    return response.data as User[]
  }
  catch (e) {
    throw new Error("No se pueden obtener los usuarios.");
  }
}

export const getById = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/GetById/${id}`)
    return response.data as User;
  } catch (e) {
    throw new Error("No se puede requerir el dato solicitado.");
  }
}

export const update = async (id: number, entity: User): Promise<User> => {
  try {
    entity.age = Number(entity.age)
    const response = await api.put(`/users/update/${id}`, entity as User)
    return response.data as User;

  } catch (e) {
    throw new Error(e);
  }
}

export const add = async (entity: User): Promise<User> => {
  try {
    entity.roleId = parseFloat(entity.roleId.toString());
    entity.age = Number(entity.age.toString());
    const response = await api.post(`/users/add`, entity)
    return response.data as User;

  } catch (e) {
    throw new Error(e);
  }
}

export const deleteById = async (id: number) => {
  try {
    const response = await api.delete(`/users/DeleteById/${id}`)
    return response.data as User;
  } catch (e) {
    throw new Error(e);
  }
}
