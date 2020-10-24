import { Message } from "discord.js"
import Knor from "../client"

export default async function(this: Knor, message: Message){
    if(message.author.bot) return
    if(message.content.startsWith(`<@${this.user.id}>`) || message.content.startsWith(`<@!${this.user.id}`)) return message.channel.send("Olá mundo!")
    if(!message.content.startsWith(this.prefix)) return
    var args = message.content.slice(this.prefix.length).split(/ +/g)
    var command = args.shift().toLowerCase()
    if(!command || command === "") return;
    if(this.bannedUsers.get(message.author.id)){
        let m = await message.channel.send("Você foi banido de usar comandos deste bot!");
        await m.react("❔");
        m.createReactionCollector((reaction, user) => user.id === message.author.id && reaction.emoji.name === "❔", { time: 30000, max: 1 }).on("collect", () => {
            message.author.send(`Você foi banido pelo motivo: \`${this.bannedUsers.get(message.author.id)}\`!`)
        })
        return;
    }
    var commandFile = this.commands.find(cmd => cmd.name === command || cmd.aliases.includes(command))
    message.reactions.removeAll()
    if(commandFile){
        if(!commandFile.allowDm && message.channel.type === "dm" || ((commandFile.manutencion || commandFile.owner) && message.author.id != this.owner )) return
        commandFile.run({ message, args })
    }
    else{
        await message.react("❓")
        var collector = message.createReactionCollector((reaction, user) => user.id === message.author.id && reaction.emoji.name === "❓", { time: 30000, max: 1 })
        collector.on("collect", () => {
            message.channel.send("Comando inválido!")
        })
    }
    return
}