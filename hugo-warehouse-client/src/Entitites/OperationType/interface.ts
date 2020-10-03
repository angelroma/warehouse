import { Operation } from "../Operation/interface";

export interface OperationType {
    id: number;
    name: string;
    operation?: Operation;
}