import { ActivitiesArray, DefaultsInterface} from './types/config'; // Some typings

// DO NOT EDIT
export {token} from './token/token';

// EDIT
// Edits the way slash commands operate. If this is not a beta bot, please set this to false.
export const DeveloperMode = true;
export const Defaults: DefaultsInterface = {
    prefix: '>'
}

export const BotName = "Servernet";

export const UserStatuses: ActivitiesArray[] = [
    {
        name: BotName + " BETA",
        type: 0
    }
]

// Servernet Moderation
export const WarnTimeout_MS = 2629800000; // 1 Months. This determins howlong a warn is active for before it gets deleted.
export const SlowmodeEnabled = true; // Discord slowmode but on the bot.
export const SlowmodeTime_MS = 3000; // 3 Seconds.

// Automod Settings.
export const AutomodEnabled = true; // Is the automod enabled?
export const AutomodMaxLength = 2000; // Maximum length of a message.