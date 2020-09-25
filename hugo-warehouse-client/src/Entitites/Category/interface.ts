import { Product } from "../../Entitites/Product/interface";

export interface Category {
    id: number;
    name: string;
    description: string;
    createdOn: Date;
    product: Product[];
}