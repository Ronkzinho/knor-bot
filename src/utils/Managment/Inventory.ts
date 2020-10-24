import Knor from "../../client";
import { User, userI } from "../../database";

export default class Inventory{
    constructor(public client: Knor, public user: string){}

    async get(): Promise<{ error?: string, items?: userI["items"]}>{
        let user = await User.findById(this.user);
        if(!user){
            return { error: `Você não tem nada registrado ainda!` }
        }
        return { items: user.items }
    }

}