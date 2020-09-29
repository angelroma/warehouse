import { Product } from "../Product/interface";
import { User } from "../User/interface";

export interface Operation {
    id: number;
    operationTypeId?: number;
    userId?: number;
    productId?: number;
    description: string;
    quantity: number;
    createdOn: Date;
    idNavigation?: any;
    product?: Product;
    user?: User;
}
