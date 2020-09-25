import { api } from "../../Utils/api.util";
import { Provider } from "./interface";

const path = '/providers'

export const getAll = async () => {
    return (await api.get(`${path}`)).data as Provider[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as Provider
}

export const update = async (id: number, entity: Provider) => {
    return (await api.put(`${path}/${id}`, entity)).data as Provider
}

export const add = async (entity: Provider) => {
    return (await api.post(`${path}`, entity)).data as Provider
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as Provider
}
