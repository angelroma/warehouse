import { Provider } from "../Provider/interface";
import { Category } from "../../Entitites/Category/interface";
import { Operation } from "../Operation/interface";

export interface Product {
    id: number;
    categoryId: number;
    providerId: number;
    name: string;
    description: string;
    price: number;
    sku: string;
    color: string;
    size: number;
    weight: number;
    precision: string;
    brand: string;
    currentTotal: number;
    createdOn: Date;
    category?: Category;
    provider?: Provider;
    active?: boolean;
    operation: Operation[];
}
