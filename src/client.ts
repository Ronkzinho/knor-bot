import { Client, Collection, User } from "discord.js"
import { commandI } from "./utils/command";
import { statSync, readdirSync } from "fs";
import * as path from "path"
import * as database from "./database"

export default class Knor extends Client{

    prefix: string = "'";
    owner: string = "370007502643003403";
    commands: Collection<string, commandI> = new Collection();
    fCommands: Knor["commands"] = new Collection();
    ghRep: string;
    iL: string;
    db: typeof database = database;
    bannedUsers: Collection<User["id"], string> = new Collection();

    constructor(options = {}){
        super(options)
        this.initializeEvents(path.resolve(__dirname, "events"));
        this.initializeCommands(path.resolve(__dirname, "commands"));
        this.getAllBannedUsers();
    }

    async getAllBannedUsers(){
        let users = await this.db.User.find()
        users.forEach(user => {
            if(user.banbot){
                this.bannedUsers.set(user._id, user.banbot.reason);
            }
        })
    }

    async initializeCommands(path){
        readdirSync(path).forEach(async file => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith(".ts") || file.endsWith(".js")){
                    const Command = (await import(filePath)).default
                    const commandName = file.replace(/.ts|.js/g,'').toLowerCase()
                    const command = new Command(this)
                    this.commands.set(commandName, command)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeCommands(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
    async initializeEvents(path){
        readdirSync(path).forEach(async file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.ts') || file.endsWith(".js")) {
                    const listener = (await import(filePath)).default
                    const eventName = file.replace(/.ts|.js/g, '')
                    // @ts-ignore
                    this.on(eventName, listener.bind(this))
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeEvents(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

}
