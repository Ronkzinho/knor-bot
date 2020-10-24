import { command, runCommand } from "../utils/command";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "leaderboard"
    }

    async run({ message }: runCommand): Promise<any> {
        let users = await this.client.db.User.find();

        let str: string = "";

        users.sort((a, b) => b.found - a.found).forEach((user, i) => {
            str += `${i + 1} - ${this.client.users.cache.get(user.id).username}: ${user.found}\n`;
        })

        message.channel.send(str)
    }
    
}