import { Attribute } from "./attributes.interface";

export interface Product {
  key: number
  name: string
  description: string
  createdOn: string
  price: number
  categoryId: number
  categoryName: string
  productAttributes: ProductAttribute[]
}

export interface ProductAttribute {
  productId: number
  attributeId : number
  value: string
}

export interface CustomParams extends Attribute {
  value: string
}