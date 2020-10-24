import { command, runCommand } from "../utils/command"

export default class extends command{
    constructor(client){
        super(client)
        this.name = "found"
        this.usage = [`${this.name}`, `${this.name} <user>`]
    }

    async run({ message, args: [u] }: runCommand){
        let dUser = message.mentions.users.first() || this.client.users.cache.find(c => c.id === u || c.username == u) || message.author
        let user = await this.client.db.User.findById(dUser.id)
        if(!user){
            return message.channel.send("Este usário não tem um saldo na carteira ainda!");
        }

        return message.channel.send(`${dUser.username} tem ${user.found.toString().replace(".", ",")} de saldo na carteira!`)

    }
}