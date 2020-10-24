import Knor from "../../client";
import { userI, userItemsI } from "../../database";
import { itemI } from "../item";

export default class Store{
    constructor(public user: userI, public item: itemI, public i: userItemsI, public id: number, protected client: Knor){}
    async sell(amount: number | string): Promise<{ success: boolean, error?: string }>{
        if(amount && this.i.amount < amount){
            return { success: false, error: "Você não tem essa quantidade de itens!" };
        }
        if(amount === "all" || amount == this.i.amount){
            this.user.items = this.user.items.filter(item => item.id !== this.id);
            this.user.markModified("items");
            return { success: true }
        }
        else if(typeof amount === "string"){
            amount = parseFloat(amount as string);
        }
        this.i.amount -= amount;
        this.user.found += this.item.price * amount;
        this.user.markModified("items");
        return { success: true };
    }
    async buy(amount: number): Promise<{ sucess: boolean, error?: string }>{
        console.log(amount)
        if(this.user.found < this.item.price * amount){
            return { sucess: false, error: "Você não tem saldo suficiente!" };
        }
        if(this.i && !this.item.stack){
            return { sucess: false, error: "Você já tem este item!" };
        }

        console.log(this.user.found, this.item.price * amount)

        this.user.found -= this.item.price * amount;
        if(this.i){  
            this.user.items.find(item => item.id === this.id).amount += amount;
            this.user.markModified("items");
        }
        else{
            let nI = {
                id: this.id,
                amount
            };
            this.user.items.push(nI);
            this.user.markModified("items");
        }
        return { sucess: true }
    }
}