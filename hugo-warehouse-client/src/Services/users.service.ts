import { User } from "../Interfaces/users.interface";
import { api } from "../Utils/api.util";

export const getAll = async (): Promise<User[]> => {
  const response = await api.get(`/users`)
  return response.data as User[]
}

export const getById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`)
  return response.data as User;
}

export const update = async (id: number, entity: User): Promise<User> => {
  entity.age = Number(entity.age)
  const response = await api.put(`/users/${id}`, entity)
  return response.data as User;
}

export const add = async (entity: User): Promise<User> => {
  
  const response = await api.post(`/users`, entity)
  return response.data as User;
}

export const deleteById = async (id: number) => {
  const response = await api.delete(`/users/${id}`)
  return response.data as User;
}
