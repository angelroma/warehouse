import { Product } from "../Interfaces/products.interface";
import { api } from "../Utils/api.util";

const path = "/products"

export const getAll = async (): Promise<Product[]> => {
    const response = await api.get(`/products`)
    const entities = response.data as Product[];
    return entities;
}

export const getById = async (id: number): Promise<Product> => {
    const response = (await api.get(`/products/${id}`)).data as Product
    return response;
}

export const update = async (id: number, entity: Product): Promise<Product> => {
    const response = await api.put(`/products/${id}`, entity)
    return response.data as Product;
}

export const add = async (entity: Product) => {
    entity.price = parseFloat(entity.price.toString());
    entity.categoryId = Number(entity.categoryId.toString());
    const response = await api.post(`/products`, entity)
    return response.data as Product;
}

export const deleteById = async (id: number) => {
    const response = await api.delete(`${path}/${id}`)
    return response.data as Product;
}
