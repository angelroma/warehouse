import { User } from "../../Entitites/User/interface";

export interface Role {
    id: number;
    name: string;
    createdOn: Date;
    user: User[];
}