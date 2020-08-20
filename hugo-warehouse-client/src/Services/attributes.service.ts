import { api } from "../Utils/api.util";
import { Attribute } from "../Interfaces/attributes.interface";

export const getAll = async (): Promise<Attribute[]> => {
  try {
    const response = await api.get(`/attributes/GetAll`)
    const entities = response.data as Attribute[];

    var result = entities.map(x => {
      return {
        key: x.key,
        description: x.description,
        name: x.name,
      } as Attribute
    })

    return result;
  }
  catch (e) {
    throw new Error("No se pueden obtener las categorías.");
  }
}