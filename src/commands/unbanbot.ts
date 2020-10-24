import { command, runCommand } from "../utils/command";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "unbanbot"
        this.owner = true
    }

    async run({ message, args: [u] }: runCommand) {
        let dU = message.mentions.users.first() || this.client.users.cache.find(us => us.username === u || us.id === u);
        if(!dU){
            return message.channel.send("Usuário não encontrado!");
        }
        let user = await this.client.db.User.findById(dU.id) || await this.client.db.User.create({ _id: message.author.id });

        if(!user.banbot.isBanned){
            return message.channel.send("Este usuário não está banido!");
        }

        user.banbot.isBanned = false;
        user.banbot.reason = null;
        user.save();

        this.client.bannedUsers.delete(dU.id)

        return message.channel.send("Usuário desbanido com sucesso!");
    }
}