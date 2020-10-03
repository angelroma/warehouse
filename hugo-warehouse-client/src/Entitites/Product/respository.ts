import { Product } from "../../Entitites/Product/interface";
import { api } from "../../Utils/api.util";

const path = '/products'

export const getAll = async () => {
    return (await api.get(`${path}`)).data as Product[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as Product
}

export const update = async (id: number, entity: Product) => {
    return (await api.put(`${path}/${id}`, entity)).data as Product
}

export const add = async (entity: Product) => {
    return (await api.post(`${path}`, entity)).data as Product
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as Product
}
