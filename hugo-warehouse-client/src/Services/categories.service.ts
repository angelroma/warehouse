import { Category, CategoryResponse, CategoryRequest } from "../Interfaces/categories.interface";
import { api } from "../Utils/api.util";

export const getAll = async (): Promise<Category[]> => {

  try {
    const response = await api.get(`/categories/GetAll`)
    const entities = response.data as CategoryResponse[];

    // var result = entities.map(x => {
    //   return {
    //     key: x.id,
    //     createdOn: x.createdOn,
    //     description: x.description,
    //     name: x.name
    //   } as Category
    // })

    return entities;
  }
  catch (e) {
    throw new Error("No se pueden obtener las categorías.");
  }
}

export const getById = async (id: number): Promise<CategoryResponse> => {
  try {
    const response = await api.get(`/categories/GetById/${id}`)
    return response.data as CategoryResponse;
  } catch (e) {
    throw new Error("No se puede requerir el dato solicitado.");
  }
}

export const update = async (id: number, entity: CategoryRequest): Promise<CategoryResponse> => {

  try {
    const response = await api.put(`/categories/update/${id}`, entity)
    return response.data as CategoryResponse;

  } catch (e) {
    throw new Error(e);
  }

}

export const add = async (entity: CategoryRequest): Promise<CategoryResponse> => {

  try {
    const response = await api.post(`/categories/add`, entity)
    return response.data as CategoryResponse;

  } catch (e) {
    throw new Error(e);
  }

}

export const deleteById = async (id: number) => {

  try {
    const response = await api.delete(`/categories/DeleteById/${id}`)
    return response.data as CategoryResponse;
  } catch (e) {
    throw new Error(e);
  }
}
