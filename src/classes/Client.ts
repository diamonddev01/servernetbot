import {Client as DiscordClient, Collection, SlashCommandBuilder, ClientOptions, Routes} from 'discord.js';
import { DeveloperMode } from '../config';
import { Database } from '../database/Database';
import { Command } from './Command';
import { ClientLogger } from './Logger';
import {REST} from '@discordjs/rest';

export class Client extends DiscordClient {
    public commands: Collection<string, Command> = new Collection();
    private slashCommands: SlashCommandBuilder[] = [];
    public db: Database;
    public logger: ClientLogger = new ClientLogger();

    constructor(options: ClientOptions) {
        super(options);

        this.db = new Database(this);
    }

    public addSlashCommand(slash: SlashCommandBuilder) {
        this.slashCommands.push(slash);
    }

    public registerSlashCommands(): Promise<boolean> {
        return new Promise(async (resolve) => {
            if(!this.user || !this.token) return resolve(false);
            const rest = new REST({ version: '10' }).setToken(this.token);
    
            if (DeveloperMode) {
                if (!this.user) return resolve(false);
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
                return resolve(true);
            }
    
            if (!this.user) return resolve(false);
    
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
    
            return resolve(success);
        })
    }
}