import { command, runCommand } from "../utils/command";
import Prefix from "../utils/Managment/Prefix";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "settings"
    }

    async run({ message, args: [item, method, prefix] }: runCommand) {
        let guild = await this.client.db.Guild.findById(message.guild.id) || await this.client.db.Guild.create({  _id: message.guild.id })
        

        switch(item){
            case "prefix":
                let pM = new Prefix(this.client, message.guild.id);
                if(method === "set"){
                    let { success, error } = await pM.set(guild, prefix);
                    if(!success){
                        return message.channel.send(error)
                    }
                    guild.save();
                    return message.channel.send("Prefixo setado!");
                }
                if(method === "reset" && guild.prefix !== this.client.prefix){
                    pM.reset(guild);
                    guild.save();
                    return message.channel.send("Prefixo resetado!");
                }
        }
    }
    
}