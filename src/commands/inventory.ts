import { command, runCommand } from "../utils/command";
import Inventory from "../utils/Managment/Inventory";
import { getItemById } from "../utils/item";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "inventory"
    }

    async run({ message }: runCommand){
        let iM = new Inventory(this.client, message.author.id);
        var { error, items } = await iM.get()
        if(error){
            return message.channel.send(error)
        }
        return message.channel.send(items.map(item => `${item.amount} - ${getItemById(item.id).name}`));
    }
}