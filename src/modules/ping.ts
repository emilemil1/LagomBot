import { Module } from "discord-dbm";
import { Message } from "discord.js";
import fetch from "node-fetch";

class Ping implements Module {
    configuration = {
        name: "Ping Module",
        description: "",
        commands: ["noonewilleverguessme"]
    }

    constructor() {
        setInterval(() => this.ping("https://chew-bot.herokuapp.com/webhook/"), 25 * 60 * 1000);
    }
    
    onCommand(command: string[], message: Message): void {
        message.reply("Test!");
    }

    async ping(url: string) {
        await fetch(url);
    }
}

export default new Ping();