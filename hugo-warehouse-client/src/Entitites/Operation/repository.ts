import { api } from "../../Utils/api.util";
import { Operation } from "./interface";

const path = '/operations'

export const getAllByDateRange = async (dateRange: any) => {
    return (await api.post(`${path}/GetAllByDateRange`, dateRange)).data as Operation[]
}

export const getById = async (id: number) => {
    return (await api.get(`${path}/${id}`)).data as Operation
}

export const update = async (id: number, entity: Operation) => {
    return (await api.put(`${path}/${id}`, entity)).data as Operation
}

export const add = async (entity: Operation) => {
    return (await api.post(`${path}`, entity)).data as Operation
}

export const remove = async (id: number) => {
    return (await api.delete(`${path}/${id}`)).data as Operation
}
