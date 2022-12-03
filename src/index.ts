import { Client } from "./classes/Client";
import { readdirSync } from "fs";
import { token } from "./config";

const client = new Client({
    /*
        GUILDS - Needed to access guilds and guild channels.
        GUILD_INTEGRATIONS & GUILD_WEBHOOKS - Needed to use webhook systems.
        GUILD_MESSAGES - To view the messages sent by users.
        MESSAGE_CONTENT - To get the content of the messages.
        GUILD_MESSAGE_REACTIONS - Might be used later on to allow message reporting (TODO #2)
    */
    intents: 34353
});

const eventFiles = readdirSync('./events/').filter(file => file.endsWith('.js'));
for(const file of eventFiles) {
    const {event} = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
}

const commandDirs = readdirSync('./commands').filter(file => !file.includes('.'));
for(const dir of commandDirs) {
    const directory = readdirSync('./commands/' + dir).filter(file => file.endsWith('.js'));
    for(const file of directory) {
        const {command} = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
        if(command.slashEnabled) {
            client.addSlashCommand(command.slash);
        }
    }
}

client.login(token);