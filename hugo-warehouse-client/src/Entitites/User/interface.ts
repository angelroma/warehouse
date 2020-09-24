import { Operation } from "../Operation/interface";
import { Role } from "../Role/interface";

export interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
    userName: string;
    roleId: number;
    createdOn: Date;
    role?: Role;
    operation: Operation[];
}
