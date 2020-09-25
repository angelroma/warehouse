import { Product } from "../../Entitites/Product/interface";

export interface Provider {
    id: number;
    name: string;
    createdOn: Date;
    product: Product[];
}
