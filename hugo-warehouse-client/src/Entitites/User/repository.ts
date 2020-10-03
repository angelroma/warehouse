import { User } from "../../Entitites/User/interface";
import { api } from "../../Utils/api.util";

const path = '/users'

export const getAll = async () => {
    return (await api.get(`${path}`)).data as User[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as User
}

export const update = async (id: number, entity: User) => {
    return (await api.put(`${path}/${id}`, entity)).data as User
}

export const add = async (entity: User) => {
    return (await api.post(`${path}`, entity)).data as User
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as User
}
