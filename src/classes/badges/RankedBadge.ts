import { flatten } from "discord.js";
import { BaseBadge, GuildOrUserBadge, _BaseBadge } from "../Badge";
import { Ranks } from "../../types/ranked";

export interface _RankedBadge extends _BaseBadge {
    type: "RANKED";
    permittedSlot: (2 | 3)[] | 2 | 3;
    season: number;
    rank: Ranks;
    level: number;
}

export class RankedBadge extends BaseBadge {
    public type: "RANKED" = "RANKED";
    public permittedSlot: (2 | 3)[] | 2 | 3 = [2, 3];

    constructor(
        badgeCode: string,
        guildOrUserBadge: GuildOrUserBadge,
        public season: number,
        public rank: Ranks,
        // 1, 2 or 3 for all ranks
        // For master the level property will be the amount of points
        // For grandmaster the level property will be the placement
        public level: number
    ) {
        super(badgeCode, "RANKED", [2,3], guildOrUserBadge);
    }

    public get jsonData(): _RankedBadge {
        return flatten(this) as _RankedBadge;
    }
}