import { CommandInteraction, Interaction, Message, SlashCommandBuilder } from "discord.js";
import { Client } from "./Client";

interface CommandConstruct {
    name: string;
    description: string;
    aliases?: string[];
    
    messageEnabled: boolean;
    slashEnabled: boolean;
    
    slashCommandData?: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    message?: (client: Client, message: Message, args: string[]) => void;
    command?: (client: Client, interaction: CommandInteraction) => void;
    interaction?: (client: Client, interaction: Interaction) => void;
}

export class Command {
    name: string;
    description: string;
    aliases?: string[];
    
    messageEnabled: boolean;
    slashEnabled: boolean;
    
    slashCommandData?: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor(construct: CommandConstruct) {
        const {name, description, aliases, messageEnabled, slashEnabled, slashCommandData, message, command, interaction} = construct;

        this.name = name;
        this.description = description;
        this.aliases = aliases || [];

        this.messageEnabled = messageEnabled;
        this.slashEnabled = slashEnabled;

        this.slashCommandData = slashCommandData ? slashCommandData.setName(this.name).setDescription(this.description) : undefined;

        this.MessageEventFunction = message ? message : this.MessageEventFunction;
        this.CommandInteractionEventFunction = command ? command : this.CommandInteractionEventFunction;
        this.InteractionEventFunction = interaction ? interaction : this.InteractionEventFunction;
    }

    private MessageEventFunction(client: Client, message: Message, args: string[]): void {
        message.channel.send({ content: `Failed to run command ${this.name} - This command does not support messages.` }).catch(); // Return an error code.
    }

    private CommandInteractionEventFunction(client: Client, interaction: CommandInteraction): void {
        interaction.reply({ content: `Failed to run command ${this.name} - This command does not support slash.`, ephemeral: true }).catch(); // Return an error code
    }

    private InteractionEventFunction(client: Client, interaction: Interaction) {
        // IGNORE
        return;
    }

    public get MessageEvent(): (client: Client, message: Message, args: string[]) => void {
        return this.MessageEventFunction;
    }

    public get CommandEvent(): (client: Client, interaction: CommandInteraction) => void {
        return this.CommandInteractionEventFunction;
    }

    public get InteractionEvent(): (client: Client, interaction: Interaction) => void {
        return this.InteractionEventFunction;
    }
}