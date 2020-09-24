import { Product } from "../../Interfaces/products.interface";

export interface Provider {
    id: number;
    name: string;
    createdOn: Date;
    product: Product[];
}
