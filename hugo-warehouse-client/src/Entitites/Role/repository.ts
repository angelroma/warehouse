import { api } from "../../Utils/api.util";
import { Role } from "./interface";

const path = '/roles'

export const getAll = async () => {
    return (await api.get(`${path}`)).data as Role[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as Role
}

export const update = async (id: number, entity: Role) => {
    return (await api.put(`${path}/${id}`, entity)).data as Role
}

export const add = async (entity: Role) => {
    return (await api.post(`${path}`, entity)).data as Role
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as Role
}
