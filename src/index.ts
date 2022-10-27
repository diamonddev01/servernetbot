import { readdir, readdirSync } from "fs";
import { Client } from "./classes/Client";
import { TOKEN, USER_STATUS } from './config';

const client = new Client({
    /*
        GUILDS - Needed to access guilds and guild channels.
        GUILD_INTEGRATIONS & GUILD_WEBHOOKS - Needed to use webhook systems.
        GUILD_MESSAGES - To view the messages sent by users.
        MESSAGE_CONTENT - To get the content of the messages.
        GUILD_MESSAGE_REACTIONS - Might be used later on to allow message reporting (TODO #2)
    */
    intents: 34353
})

// Load events from the events directory
const eventFiles = readdirSync('./events/').filter(file => file.endsWith('.js')); // Loads all the files that end with .js from the events directory.
for (const file of eventFiles) {
    const { event } = require(`./events/${file}`); // Require the file and import the function
    const eventName = file.split('.')[0]; // get the name of the event
    client.on(eventName, event.bind(null, client)); // Connect it so it is run when the event happens.
}

// Load commands from the commands directories
const commandDirs = readdirSync('./commands').filter(file => !file.includes('.')); // Loads all the directories from commands.
for (const dir of commandDirs) { // Reads through each directory from the commands directory.
    const directory = readdirSync('./commands/' + dir).filter(file => file.endsWith('.js')); // Loads all files that end with .js from the directory
    for (const file of directory) { // Reads through each command from the directory.
        const { command } = require(`./commands/${dir}/${file}`); // Reauires the command and its data
        client.commands.set(command.name, command); // Sets a command on the bot
        if (command.slashEnabled) {
            client.addSlashCommand(command.slash); // If the command has slashcommand data then sends it to be added on discords api.
        }
    }
}

// Login to the bot
client.login(TOKEN);