import { flatten } from "discord.js";
import { BaseBadge, GuildOrUserBadge, _BaseBadge } from "../Badge";

export interface _LevelBadge extends _BaseBadge {
    type: "LEVEL";
    permittedSlot: (2 | 3)[] | 2 | 3;
    messages: 100 | 250 | 500 | 750 | 1000 | 2500 | 5000 | 10000;
}

export class LevelBadge extends BaseBadge {
    public type: "LEVEL" = "LEVEL";
    public permittedSlot: (2 | 3)[] | 2 | 3 = [2,3];

    constructor(
        badgeCode: string,
        guildOrUserBadge: GuildOrUserBadge,
        public messages: 100 | 250 | 500 | 750 | 1000 | 2500 | 5000 | 10000
    ) {
        super(badgeCode, "LEVEL", [2, 3], guildOrUserBadge);
    }

    public get jsonData(): _LevelBadge {
        return flatten(this) as _LevelBadge;
    }
}