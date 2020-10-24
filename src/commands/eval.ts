import { MessageEmbed } from "discord.js";
import { command, runCommand } from "../utils/command";

export default abstract class extends command{
    constructor(client){
        super(client)
        this.name = "eval"
        this.aliases = ["e"]
        this.owner = true
    }
    async run({ message, args }: runCommand){
        try{
            const result = eval(args.join(' '))
            return message.channel.send(new MessageEmbed({
                title: "Resultado do eval:",
                description: result.toString(),
                color: "#ff0000"
            }))
        }
        catch(error){
            return message.channel.send(error.toString())
        }
    }
}