import { Client, CommandInteraction, Interaction, Message, SlashCommandBuilder, UserFlags } from "discord.js";
import { HelpData } from "../types/helpData";

interface Construct {
    name: string;
    description: string;
    help: HelpData;
    aliases?: string[];
    slashEnabled?: boolean;
    SlashCommandData?: SlashCommandBuilder;
    message?: (client: Client, message: Message, args: string[]) => void;
    command?: (client: Client, interaction: CommandInteraction) => void;
    interaction?: (client: Client, interaction: Interaction) => void;
}

export class Command {
    name: string;
    description: string;
    help: HelpData;
    aliases: string[];
    slash?: SlashCommandBuilder;
    slashEnabled: boolean = false;

    constructor(construct: Construct) {
        const { name, description, help, aliases } = construct;
        this.name = name;
        this.description = description;
        this.help = help;
        this.aliases = aliases ? aliases : [];

        if (construct.slashEnabled) {
            if (construct.SlashCommandData) {
                construct.SlashCommandData.setName(this.name);
                construct.SlashCommandData.setDescription(this.description);

                this.slash = construct.SlashCommandData;
                this.slashEnabled = true;
            }
        }

        if (construct.message) this.set_msg(construct.message);
        if (construct.command) this.set_intcmd(construct.command);
        if (construct.interaction) this.set_intother(construct.interaction);
    }

    // The run functions.
    msg_run(client: Client, message: Message, args: string[]): void {
        message.channel.send({ content: `Failed to run command ${this.name} - msg_run function not defined.` }).catch(); // Return an error code.
    }

    int_run(client: Client, interaction: CommandInteraction): void {
        interaction.reply({ content: `Failed to run command ${this.name} - int_run function not defined`, ephemeral: true }).catch(); // Return an error code
    }

    int_other(client: Client, interaction: Interaction) {
        // IGNORE
        return;
    }

    // Allow the command to redefine what happens on a message
    set_msg(func: (client: Client, mesasge: Message, args: string[]) => void) {
        this.msg_run = func;

        return this;
    }

    set_intcmd(func: (client: Client, interaction: CommandInteraction) => void) {
        this.int_run = func;

        return this;
    }

    set_intother(func: (client: Client, interaction: Interaction) => void) {
        this.int_other = func;

        return this;
    }

    // Stuff that gets called by the event
    evt_msg(c: Client, m: Message, a: string[]) {
        try {
            this.msg_run(c, m, a);
        } catch (e) {
            console.log(e);
        }
    }

    evt_command(c: Client, i: CommandInteraction) {
        try {
            this.int_run(c, i);
        } catch (e) {
            console.log(e);
        }
    }

    evt_interaction(c: Client, i: Interaction) {
        try {
            this.int_other(c, i);
        } catch (e) {
            console.log(e);
        }
    }
}