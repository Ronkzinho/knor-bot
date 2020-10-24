import { command, runCommand } from "../utils/command";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "transfer"
    }
    async run({ message, args: [u, a] }: runCommand){
        let user = await this.client.db.User.findById(message.author.id);
        let amount = parseFloat(a.replace(",", "."));
        if(!user){
            return message.channel.send("Você não tem nada registrado ainda!");
        }
        if(user.found < amount){
            return message.channel.send("Você não tem saldo na carteira suficente!");
        }
        let dU = message.mentions.users.first() || this.client.users.cache.find(us => us.username == u || us.id === u);
        if(!dU){
            return message.channel.send("Digite um usário válido!");
        }
        let destinationU = await this.client.db.User.findById(dU.id) || await this.client.db.User.create({ _id: dU.id, bank: 0, found: 0, items: [], lastDaily: null });
        user.found -= amount;
        destinationU.found += amount;
        user.save();
        destinationU.save();

        return message.channel.send(`${amount} tranferida para ${dU.username} com sucesso!`)

    }
}