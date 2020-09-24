import { api } from "../Utils/api.util";
import { Provider } from "../Interfaces/providers.interface";

const path = "/providers";

export const getAll = async () => {
    const entities = (await api.get(path)).data as Provider[]
    return entities;
}
