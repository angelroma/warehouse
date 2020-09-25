import { Category } from "../../Entitites/Category/interface";
import { api } from "../../Utils/api.util";

const path = '/categories'

export const getAll = async () => {
    return (await api.get(`${path}`)).data as Category[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as Category
}

export const update = async (id: number, entity: Category) => {
    return (await api.put(`${path}/${id}`, entity)).data as Category
}

export const add = async (entity: Category) => {
    return (await api.post(`${path}`, entity)).data as Category
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as Category
}
