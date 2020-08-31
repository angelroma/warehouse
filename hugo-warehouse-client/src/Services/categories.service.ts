import { Category } from "../Interfaces/categories.interface";
import { api } from "../Utils/api.util";

export const getAll = async (): Promise<Category[]> => {

  try {
    const response = await api.get(`/categories/GetAll`)
    const entities = response.data as Category[];
    return entities;
  }
  catch (e) {
    throw new Error("No se pueden obtener las categorías.");
  }
}

export const getById = async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/GetById/${id}`)
    return response.data as Category;
}

export const update = async (id: number, entity: Category): Promise<Category> => {

  try {
    const response = await api.put(`/categories/update/${id}`, entity)
    return response.data as Category;

  } catch (e) {
    throw new Error(e);
  }

}

export const add = async (entity: Category): Promise<Category> => {

  try {
    const response = await api.post(`/categories/add`, entity)
    return response.data as Category;

  } catch (e) {
    throw new Error(e);
  }

}

export const deleteById = async (id: number) => {

  try {
    const response = await api.delete(`/categories/DeleteById/${id}`)
    return response.data as Category;
  } catch (e) {
    throw new Error(e);
  }
}
