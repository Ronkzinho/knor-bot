import express from "express";
import cors from "cors";
import client from "./index"
import { commandI } from "./utils/command";

let app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Olá mundo!")
})
app.get("/commands", (req, res) => {
    return res.json(client.fCommands);
})

app.get("/commands/:command", (req, res) => {
    let name: any = req.params["command"];
    let command = client.fCommands.find(cmd => cmd.name === name || cmd.aliases.includes(name));
    return res.json(command);
})

app.get("/prefix", (req, res) => {
    return res.send({ prefix: client.prefix })
})

app.post("/prefix", (req, res) => {
    let authorization = req.headers["authorization"];
    let token = authorization.split(" ")[1];

    if(token !== process.env.OWNER_DISCORD_TOKEN) return res.status(403).send();

    client.prefix = req.body.prefix;

    return res.status(200).send();
})

app.get("/info", (req, res) => {
    return res.json({ iL: client.iL, ghRep: client.ghRep });
})

app.get("/inventory", (req, res) => {
    let authorization = req.headers["authorization"];
    return res.json()
})

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server startado(na porta ${process.env.PORT || 3333})!`)
})