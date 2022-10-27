import { Client } from "../classes/Client";
import { Message } from "discord.js";
import { sendNetworkMessage } from "../network/sendMessage";

export async function event(client: Client, message: Message): Promise<void> {
    if (!message.guild || !message.guildId) return; // Stops commands being used in dms and fixes warnings.
    const prefix = client.db.get_guild_prefix(message.guildId); // Allow dynamic prefixing, TODO #3

    if (!message.content.startsWith(prefix)) {
        sendNetworkMessage(client, message);
        return;
    }

    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (!command) return;

    // Check command exists
    const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command)); // Ignore issues
    if (cmd) {
        cmd.evt_msg(client, message, args);
    }
}