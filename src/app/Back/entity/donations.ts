import { User } from "./user";
import {Associations} from "./associations"
export class Donations{
    id!:number;
    date:Date | undefined;
    description!: string;
    associations!:Associations;
    quantite!:number;
    user!: User;
    suivi!:boolean
}