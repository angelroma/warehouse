import { Product } from "../Interfaces/products.interface";
import { api } from "../Utils/api.util";
import moment from 'moment';

export const getAll = async (StartDate: moment.Moment, EndDate: moment.Moment): Promise<Product[]> => {
  try {
    const response = await api.post(`/products/GetAll`, {
      StartDate: StartDate,
      EndDate: EndDate
    })
    const entities = response.data as Product[];

    var result = entities.map(x => {
      return {
        key: x.key,
        createdOn: x.createdOn,
        description: x.description,
        price: x.price,
        name: x.name,
        categoryId: x.categoryId,
        categoryName: x.categoryName,
      } as Product
    })

    return result;
  }
  catch (e) {
    throw new Error("No se pueden obtener las categorías.");
  }
}

export const getById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/GetById/${id}`)
    return response.data as Product;
  } catch (e) {
    throw new Error("No se puede requerir el dato solicitado.");
  }
}

export const update = async (id: number, entity: Product): Promise<Product> => {

  try {
    entity.price = parseFloat(entity.price.toString())
    entity.categoryId = Number(entity.categoryId.toString())
    const response = await api.put(`/products/update/${id}`, entity as Product)
    return response.data as Product;

  } catch (e) {
    throw new Error(e);
  }

}

export const add = async (entity: Product): Promise<Product> => {

  try {
    entity.price = parseFloat(entity.price.toString());
    entity.categoryId = Number(entity.categoryId.toString());
    const response = await api.post(`/products/add`, entity)
    return response.data as Product;

  } catch (e) {
    throw new Error(e);
  }

}

export const deleteById = async (id: number) => {

  try {
    const response = await api.delete(`/products/DeleteById/${id}`)
    return response.data as Product;
  } catch (e) {
    throw new Error(e);
  }
}
