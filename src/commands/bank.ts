import Knor from "../client";
import { command, runCommand } from "../utils/command";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "bank"
        this.category = "utility"
    }

    async run({ message, args: [method, amount] }: runCommand){
        let user = await this.client.db.User.findById(message.author.id)
        
        if(!user){
            return message.channel.send("Você não tem nada registrado ainda!")
        }

        if(!method){
            return message.channel.send(`Você tem ${user.bank} de saldo no banco!`);
        }

        let a: number = parseFloat(amount.replace(",", "."));

        switch(method){
            case "deposit": case "depositar":
                if(user.found < a){
                    return message.channel.send("Você não tem saldo suficiente na carteira para isso!");
                }
                user.found -= a;
                user.bank += a;
                user.save();

                return message.channel.send(`${amount} depositada no banco com sucesso!`);

            case "withdraw": case "sacar":
                if(user.bank < a){
                    return message.channel.send("Você não tem saldo suficiente no banco para isso!");
                }
                user.bank -= a;
                user.found += a;

                user.save();

                return message.channel.send(`${amount} transferida para a carteira com sucesso!`)
        }
    }

}