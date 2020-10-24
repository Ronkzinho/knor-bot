import { command, runCommand } from "../utils/command";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "banbot"
        this.owner = true;
    }

    async run({ message, args: [u, ...reason] }: runCommand) {
        let dU = message.mentions.users.first() || this.client.users.cache.find(us => us.username === u || us.id === u);
        if(!dU){
            return message.channel.send("Usuário não encontrado");
        }
        let user = await this.client.db.User.findById(dU.id) || await this.client.db.User.create({ _id: dU.id });
        
        if(user.banbot.isBanned){
            return message.channel.send("Este usário já está banido!")
        }

        user.banbot.isBanned = true;
        user.banbot.reason = reason && reason.join(" ");
        user.save();

        this.client.bannedUsers.set(dU.id, reason && reason.join(" "));

        return message.channel.send("Usuário banido com sucesso!")
    }
}