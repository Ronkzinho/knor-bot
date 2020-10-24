import "dotenv/config";
import Knor from "./client";

let client = new Knor();

client.login(process.env.TOKEN);

export default client;