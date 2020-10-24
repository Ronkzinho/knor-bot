import Knor from "../client";

export default async function(this: Knor){
    console.log(`${this.user.username} online`);
    this.iL = `https://discord.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=8`;
    this.ghRep = `https://github.com/${this.users.cache.get(this.owner).username}/${this.user.username}/`;
    this.fCommands = this.commands.filter(c => !c.hidden && !c.owner && !c.manutencion);
    this.user.setActivity({ name: `comandos com meu prefixo: ${this.prefix}`, type: 3 });
}