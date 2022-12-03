import { CommandInteraction, Interaction, InteractionType, ModalSubmitInteraction } from "discord.js";
import { Client } from "../classes/Client";
import { Command } from "../classes/Command";

export function event(client: Client, interaction: Interaction): void {
    if (!interaction.guildId) return;

    if (interaction.type == InteractionType.ApplicationCommand) CommandHandle(client, <CommandInteraction>interaction);
    if (interaction.type == InteractionType.ModalSubmit) modalHandler(client, <ModalSubmitInteraction>interaction);
}

function CommandHandle(client: Client, interaction: CommandInteraction): void {
    if (interaction.channel?.isDMBased()) return;
    if (!interaction.channel) return;

    const cmdName = interaction.commandName;
    const cmd = client.commands.get(cmdName);

    if (cmd) {
        cmd.CommandEvent(client, interaction);
    }
}

function modalHandler(client: Client, interaction: ModalSubmitInteraction): void {
    let cmdName: string | string[] = interaction.customId.split(':');
    if (!cmdName[1]) return;
    cmdName = cmdName[0];

    const cmd = client.commands.get(cmdName);

    if (cmd) {
        cmd.InteractionEvent(client, interaction);
    }
}