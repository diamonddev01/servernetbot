import { CommandInteraction, Interaction, InteractionType } from "discord.js";
import { Client } from "../classes/Client";
import { Command } from "../classes/Command";

export function event(client: Client, interaction: Interaction): void {
    if (!interaction.guildId) return;

    if (interaction.type == InteractionType.ApplicationCommand) CommandHandle(client, <CommandInteraction>interaction);
}

function CommandHandle(client: Client, interaction: CommandInteraction) {
    const cmdName = interaction.commandName;
    const cmd = client.commands.get(cmdName);

    if (cmd) {
        cmd.evt_command(client, interaction);
    }
}