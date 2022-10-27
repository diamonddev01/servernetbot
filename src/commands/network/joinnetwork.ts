import { InteractionType, PermissionsBitField, SlashCommandBuilder, TextInputModalData, UserFlags } from "discord.js";
import { Command } from "../../classes/Command";

export const command = new Command({
    name: 'joinnetwork',
    description: 'Joins the Servernet network',
    help: {
        Display: false
    },
    slashEnabled: true,
    SlashCommandData: new SlashCommandBuilder()
        .addChannelOption((option) => 
            option.setDescription('The channel you want Servernet to run in')
                .setName('channel')
                .setRequired(true)
        )
    ,
    async message(client, message, args) {
        message.reply({ content: 'This is currently only supported through slash commands :( | /joinnetwork' });
    },
    async command(client, interaction) {
        // Check permissions
        if (!interaction.member) return;
        if (!(interaction.member.permissions as PermissionsBitField).has([PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageChannels], true)) {
            // calculate missing permission
            let missingPermissions = [];
            if (!(interaction.member.permissions as PermissionsBitField).has(PermissionsBitField.Flags.ManageGuild)) missingPermissions.push('MANAGE_GUILD');
            if (!(interaction.member.permissions as PermissionsBitField).has(PermissionsBitField.Flags.ManageChannels)) missingPermissions.push('MANAGE_CHANNEL');
            interaction.reply({ content: 'Permission Denied | Missing Permissions: [' + missingPermissions.join(', ') + ']', ephemeral: true }).catch();
            return;
        }

        const cnl = interaction.options.get('channel', true);

        if (!interaction.guild) return;

        if (!cnl.channel) {
            interaction.reply({ content: 'Something went wrong | Err: NO_CHANNEL_ID_PROPERTY', ephemeral: true }).catch();
            return;
        }

        const channelId = cnl.channel.id;

        if (!interaction.guildId) {
            interaction.reply({ content: 'Servernet cannot be registered here | Err: GUILD_NOT_FOUND', ephemeral: true }).catch();
            return;
        }

        // Check if servernet is on this channel or guild
        const isOnNetwork = client.db.isOnNetwork({ channelId: channelId, guildId: interaction.guildId })
        if (isOnNetwork.channel || isOnNetwork.guild) {
            interaction.reply({ content: 'Servernet is already registered on this guild', ephemeral: true }).catch();
            return;
        }
        
        await interaction.reply({ content: `Setting up Servernet in <#${channelId}> (${cnl.channel.name})` }).catch();

        // Check bot perms in channel
        const channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId).catch();

        if (!channel || !channel.isTextBased() || channel.isDMBased()) {
            interaction.editReply({ content: 'Something went wrong | Err: PERMISSION_CHK_FAIL<NO_CHANNEL_FOUND>' }).catch();
            return;
        }

        const channelPermissions = channel.permissionsFor(client.user?.id as string) as PermissionsBitField;
        if (!channelPermissions) {
            interaction.editReply({ content: 'Something went wrong | Err: PERMISSION_CHK_FAIL<CHANNEL_PERMISSIONS_NOT_FOUND>' }).catch();
        }

        const required = channelPermissions.has(['SendMessages', 'UseExternalEmojis', 'AddReactions']);
        if (!required) {
            interaction.editReply({ content: 'I dont have my needed permissions (Send Messages, Use External Emojis & Add Reactions) | Err: PERMISSION_CHK_FAIL<MISSING_PERMISSIONS>' }).catch();
            return;
        }

        const optional_missing = [];
        if (!channelPermissions.has('ManageMessages')) optional_missing.push('MANAGE_MESSAGES');
        if (!channelPermissions.has('EmbedLinks')) optional_missing.push('EMBED_LINKS');
        if (!channelPermissions.has('AttachFiles')) optional_missing.push('ATTACH_FILES');
        if (!channelPermissions.has('ReadMessageHistory')) optional_missing.push('READ_MESSAGE_HISTORY');
        if (!channelPermissions.has('UseExternalStickers')) optional_missing.push('USE_EXTERNAL_STICKERS');

        // Ask the db to add the channel
        client.db.addToNetwork({
            guild: interaction.guild,
            channel: channel,
            addedBy: interaction.user
        });

        await interaction.editReply({content: `Servernet is now set up in <#${channelId}> (${cnl.channel.name})`}).catch();
    },
    async interaction(client, interaction) {
        // Is the interaction a modal submission?
        if (interaction.type == InteractionType.ModalSubmit) {
            // Only called from a message init.
            const data = interaction.fields;

            const channelIdData = <TextInputModalData>data.getField('channelid');
            if (!channelIdData.value) return; // Yes it does exist you dumb shit
            const channelId = channelIdData.value;
        }

        if (interaction.type == InteractionType.MessageComponent) {
            //
        }
    },
})
/*


// Popup a modal asking for the information.
        const modal = new ModalBuilder()
            .setTitle('Servernet Setup for ' + interaction.guild?.name as string)
            .setCustomId('joinnetwork:setup_modal');
        //

        const channelIdInput = new TextInputBuilder()
            .setCustomId('channelid')
            .setLabel('What channel should servernet operate in?')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setValue(interaction.channelId as string);
        //

        const actionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(channelIdInput);
        modal.addComponents(actionRow);

        interaction.showModal(modal);

        */