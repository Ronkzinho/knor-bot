import Knor from "../client"
import { Message } from "discord.js";
import { categorysInterface } from "./categorys";

export interface commandI extends command{}
export interface runCommand{
    message: Message
    args: Array<string>
}
export abstract class command implements commandI{
    owner: boolean;
    category: categorysInterface["name"] = null;
    name: string;
    description: string;
    usage: Array<string> = [];
    aliases: Array<string> = [];
    manutencion: boolean = false;
    hidden: boolean = false;
    allowDm: boolean = false;
    constructor(protected client: Knor){
        this.owner = false;
        this.category = null;
        this.description = null;
        this.usage;
        this.aliases;
        this.manutencion;
        this.hidden;
        this.allowDm;
    }
    abstract async run({ }: runCommand): Promise<any>
}