const v = {
    "id": 100000, // The channel ID
    "name": "abc-channel-xyz", // The name of the channel, will auto_update
    "messages": 0, // Number of messages sent on channel
    "guild_id": 100000, // The guild the channel belongs to
    "on_network": true, // Is the channel actively on the network
    "$warn": [ // Channel warnings. Used by the bot to auto_disconnect.
        {
            "warn_code": 0,
            "warn_reason": "Perm Fail", // the reason the warn got added
            "$before_fail": 3, // How many more times this can happen
            "notified": true, // Was the owner notified
            "removed": false // Was the bot removed from the guild.
        }
    ]
}

const WarnCodes = {
    0: "error", // Usually called if the bot cant send a message
}