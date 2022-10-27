import { Guild, GuildTextBasedChannel, User } from "discord.js";

export interface addGuildToNetworkIn {
    channel: GuildTextBasedChannel;
    guild: Guild;
    addedBy: User;
}

interface isOnNetworkInData {
    guildId?: string;
    channelId?: string;
}

export type isOnNetworkIn = RequireAtLeastOne<isOnNetworkInData, 'guildId' | 'channelId'>;

type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?:
            Required<Pick<T, K>>
            & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]
//

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]
//

export interface isOnNetworkOut {
    guild: boolean;
    channel: boolean;
}