import { Guild } from "discord.js";
import Knor from "../../client";
import { guildI } from "../../database";

export default class Prefix{
    constructor(protected client: Knor, public guildId: Guild["id"]){}

    async set(guild: guildI, prefix: string): Promise<{ success: boolean, error?: string }>{
        if(!prefix) return;
        if(prefix.length > 5){
            return { success: false, error: `No máximo 5 caracteres!` };
        }

        if(prefix === this.client.prefix){
            this.reset(guild);
            return { success: true };
        }

        guild.prefix = prefix;
        this.client.prefixes.set(this.guildId, prefix);
        return { success: true };
    }

    reset(guild: guildI): { sucess: boolean, error?: string }{
        guild.prefix = null;
        return { sucess: true };
    }

    get(){
        return this.client.prefixes.get(this.guildId);
    }

}