import { flatten } from "discord.js";
import { StaffRanks } from "../../types/staffRanks";
import { BaseBadge, GuildOrUserBadge, _BaseBadge } from "../Badge";

export interface _StaffBadge extends _BaseBadge {
    type: "STAFF";
    permittedSlot: 1;
    rank: StaffRanks;
}

export class StaffBadge extends BaseBadge {
    public type: "STAFF" = "STAFF";
    public permittedSlot: 1 = 1;

    constructor(
        badgeCode: string,
        guildOrUserBadge: GuildOrUserBadge,
        public rank: StaffRanks
    ) {
        super(badgeCode, "STAFF", 1, guildOrUserBadge);
    }

    public get json(): _StaffBadge {
        return flatten(this) as _StaffBadge;
    }
}