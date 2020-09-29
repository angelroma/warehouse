import { Product } from "../../Entitites/Product/interface";

export interface Provider {
    id: number;
    name: string;
    active?: boolean;
    createdOn: Date;
    product: Product[];
}
