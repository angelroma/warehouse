import { Role } from "../Interfaces/roles.interface";
import { api } from "../Utils/api.util";

export const getAll = async () => {
  try {
    const response = await api.get(`/roles`)
    const entities = response.data as Role[]
    return entities;
  }
  catch (e) {
    throw new Error("No se pueden obtener los usuarios.");
  }
}
