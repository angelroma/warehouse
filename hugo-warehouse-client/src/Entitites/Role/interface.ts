import { User } from "../../Interfaces/users.interface";

export interface Role {
    id: number;
    name: string;
    createdOn: Date;
    user: User[];
}