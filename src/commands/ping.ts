import { command, runCommand } from "../utils/command";

export default class extends command{
    constructor(client){
        super(client)
        this.name = "ping"
        this.category = "utility"
    }
    async run({ message }: runCommand){
        let msg = await message.channel.send("Ping?");
        return msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`);
    }
}