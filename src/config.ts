const pkg_json = require('../../package.json');
//import { ActivityType } from "discord.js";

import { token } from './__hidden/config'; // Edit this file here.This is to stop this file being committed.
export const TOKEN = token;

// Changes the way the bot registers slash commands. Have true for the first run, then false for all runs after that.
// If this is a test or beta bot, leave this true.
export const DEVELOPER_MODE = true;

export const DEFAULT_PREFIX = '>'; // The bots default prefix.

// STATUSES
export const USER_STATUS = [
    {
        "text": "Version " + pkg_json.version,
        "type": 0 // Activity Type for playing.
    },
    {
        "text": "SERVERNET BETA",
        "type": 0
    }
]