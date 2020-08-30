import { Product } from "../Interfaces/products.interface";
import { api } from "../Utils/api.util";

export const getAll = async (): Promise<Product[]> => {
    const response = await api.get(`/products`)
    const entities = response.data as Product[];
    return entities;
}

export const getById = async (id: number): Promise<Product> => {
    const response = (await api.get(`/products/GetById/${id}`)).data as Product
    return response;
}

export const update = async (id: number, entity: Product): Promise<Product> => {

  try {
    entity.price = parseFloat(entity.price.toString())
    entity.categoryId = Number(entity.categoryId.toString())
    const response = await api.put(`/products/update/${id}`, entity as Product)
    return response.data as Product;

  } catch (e) {
    throw new Error(e);
  }

}

export const add = async (entity: Product): Promise<Product> => {

  try {
    entity.price = parseFloat(entity.price.toString());
    entity.categoryId = Number(entity.categoryId.toString());
    const response = await api.post(`/products/add`, entity)
    return response.data as Product;

  } catch (e) {
    throw new Error(e);
  }

}

export const deleteById = async (id: number) => {

  try {
    const response = await api.delete(`/products/DeleteById/${id}`)
    return response.data as Product;
  } catch (e) {
    throw new Error(e);
  }
}
