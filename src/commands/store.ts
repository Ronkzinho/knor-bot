import { User, userI } from "../database";
import { command, runCommand } from "../utils/command";
import { getIdByItem, getItemById, items } from "../utils/item";
import Store from "../utils/Managment/Store";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "store"
        this.category = "utility"
    }

    async run({ message, args: [method, item, amount] }: runCommand){
        let user = await this.client.db.User.findById(message.author.id);
        let sI = items.find(i => i.name === item);
        let id = getIdByItem(sI);
        if(!sI){
            return message.channel.send("Item não encontrado!")
        }
        if(!user){
            return message.channel.send("Você não tem nada registrado ainda!");
        }
        let i = user.items.find(it => getItemById(it.id));
        let sM = new Store(user, sI, user.items.find(it => it.id == id), id, this.client);
        switch(method){
            case "buy":
                let buy = await sM.buy(amount ? parseInt(amount) : 1)
                if(!buy.sucess){
                    return message.channel.send(buy.error);
                }
                user.save()
                return message.channel.send("Item comprado com sucesso!");
            case "sell":
                if(!i){
                    return message.channel.send("Você não tem esse item!");
                }
                let sell = await sM.sell(amount !== "all" ? amount ? parseInt(amount) : 1 : amount);
                if(!sell.success){
                    return message.channel.send(sell.error);
                }
                user.save();
                message.channel.send("Item vendido com sucesso!");
        }
    }
}