import { command, runCommand } from "../utils/command";
import ms from "parse-ms";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "daily"
        this.category = "utility"
    }

    async run({ message }: runCommand){
        let user = await this.client.db.User.findById(message.author.id) || await this.client.db.User.create({ _id: message.author.id });
        let cooldown = 8.64e+7;
        if(user.lastDaily){
            let tL = cooldown - (Date.now() - user.lastDaily);
            
            if(tL > 0){
                let when = ms(tL);

                if(when){
                    let { hours, minutes, seconds } = when;
                    return message.channel.send(`Espere mais ${hours > 1 && `${hours} horas e`} ${minutes > 1 && `${minutes} minutos e`} ${seconds > 1 && `${seconds} segundos`}!`)
                }
            }
        }
        user.found += 500;
        user.lastDaily = Date.now();

        user.save();

        message.channel.send(`500 de saldo foram adicionados na sua carteira!`)

    }

}