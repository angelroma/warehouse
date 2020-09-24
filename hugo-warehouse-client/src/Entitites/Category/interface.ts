import { Product } from "../../Interfaces/products.interface";

export interface Category {
    id: number;
    name: string;
    description: string;
    createdOn: Date;
    product: Product[];
}