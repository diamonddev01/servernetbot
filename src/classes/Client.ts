import { Client as bClient, ClientOptions, Collection, SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import { TOKEN, DEVELOPER_MODE } from '../config';
import { db as database} from './Database';
import { Command } from './Command';

export class Client extends bClient {
    commands: Collection<string, Command> = new Collection();
    slashCommands: SlashCommandBuilder[] = [];
    db: database = new database();

    constructor(options: ClientOptions) {
        super(options);
    }

    addSlashCommand(cmd: SlashCommandBuilder): void {
        this.slashCommands.push(cmd);
    }

    async registerSlash(): Promise<number | boolean> {
        const rest = new REST({ version: '10' }).setToken(TOKEN);

        if (DEVELOPER_MODE) {
            if (!this.user) return false;
            let errors: string[] = [];

            for (const guild of this.guilds.cache.map(g => g.id)) {
                try {
                    await rest.put(Routes.applicationGuildCommands(this.user.id, guild), { body: this.slashCommands }).catch(error => {
                        errors.push(guild);
                        console.log(error);
                    });
                } catch(ewwow) {
                    errors.push(guild);
                    console.log(ewwow);
                }
            }

            if (errors.length > 0) console.log(`Failed to load commands in ${errors.join(', ')}`);
            return errors.length;
        }

        if (!this.user) return false;

        let success = true;

        try {
            await rest.put(Routes.applicationCommands(this.user.id), { body: this.slashCommands }).catch(error => {
                console.log('Failed to load slash commands');
                console.log(error);
                success = false;
            });
        } catch {
            console.log('Failed to load slash commands');
            success = false;
        }

        return success ? 0 : false;
    }
}