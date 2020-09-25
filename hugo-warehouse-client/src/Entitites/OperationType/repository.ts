import { api } from "../../Utils/api.util";
import { OperationType } from "./interface";

const path = '/operationTypes'

export const getAll = async () => {
    return (await api.get(`${path}`)).data as OperationType[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as OperationType
}

export const update = async (id: number, entity: OperationType) => {
    return (await api.put(`${path}/${id}`, entity)).data as OperationType
}

export const add = async (entity: OperationType) => {
    return (await api.post(`${path}`, entity)).data as OperationType
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as OperationType
}
