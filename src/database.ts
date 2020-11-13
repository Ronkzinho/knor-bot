import "dotenv/config";
import { Schema, model, Document, connect } from "mongoose";
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export interface userItemsI{
    id: number,
    amount: number
};

export interface userI extends Document{
    _id: string,
    found?: number,
    bank?: number,
    lastDaily?: number,
    items?: userItemsI[],
    banbot?: {
        isBanned: boolean,
        reason: string
    }
};

export interface guildI extends Document{
    _id: string,
    prefix?: string
};

let UserSchema = new Schema({
    _id: String,
    bank: Number,
    lastDaily: Number,
    items: Array,
    found: {
        default: 0,
        type: Number
    },
    banbot: {
        isBanned: {
            default: false,
            type: Boolean
        },
        reason: {
            default: null,
            type: String
        }
    }
}, {
    _id: false
});

let GuildSchema = new Schema({
    _id: String,
    prefix: String
}, {
    _id: false
});

export let Guild = model<guildI>("Guild", GuildSchema);
export let User = model<userI>("User", UserSchema);