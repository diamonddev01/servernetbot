import { Client } from "../classes/Client";
import { Message } from "discord.js";

const prefix = '>'; // TODO map prefix.

export async function event(client: Client, message: Message): Promise<void> {
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (!command) return;

    // Check command exists
    const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command)); // Ignore issues
    if (cmd) {
        cmd.MessageEvent(client, message, args);
    }
}