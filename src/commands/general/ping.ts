import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../classes/Command";

export const command = new Command({
    name: 'ping',
    description: 'Replies with the ping of the bot',
    help: {
        Display: false
    },
    slashEnabled: true,
    SlashCommandData: new SlashCommandBuilder(),
    async message(client, message, args) {
        const handleTime = Date.now() - message.createdTimestamp;
        const sendingDate = Date.now();
        const reverseMessage = await message.channel.send({ content: 'Pong!\n\nCalculating...' }).catch();
        const sendTime = sendingDate - reverseMessage.createdTimestamp;
        const eventTime = Date.now() - reverseMessage.createdTimestamp;

        reverseMessage.edit({ content: `Pong!\n\nHandle Time: ${handleTime > 0 ? handleTime : handleTime * -1}\nSend Time: ${sendTime > 0 ? sendTime : sendTime * -1}\nEvent Time: ${eventTime > 0 ? eventTime : eventTime * -1}` }).catch();
    },
    async command(client, interaction) {
        const handleTime = Date.now() - interaction.createdTimestamp;
        const sendingDate = Date.now();
        await interaction.reply({ content: 'Pong!\n\nCalculating...', ephemeral: true }).catch();
        const finalTime = Date.now() - sendingDate
        interaction.editReply({content: `Pong!\n\nHandle Time: ${handleTime > 0 ? handleTime : handleTime * -1}\n2 way Time: ${finalTime > 0 ? finalTime : finalTime * -1}` }).catch();
    }
})