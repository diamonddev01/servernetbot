import { flatten } from "discord.js";
import { BaseBadge, GuildOrUserBadge, _BaseBadge } from "../Badge";

export type PartnerTypes = "Partner" | "Verified" | "Contributor";

export interface _PartnershipBadge extends _BaseBadge {
    type: "PARTNERSHIP";
    permittedSlot: 1 | 2 | (1 | 2)[];
    rank: PartnerTypes;
}

export class PartnershipBadge extends BaseBadge {
    public type: "STAFF" = "STAFF";
    public permittedSlot: 1 | 2 | (1 | 2)[];

    constructor(
        badgeCode: string,
        guildOrUserBadge: GuildOrUserBadge,
        public rank: PartnerTypes
    ) {
        super(badgeCode, "STAFF", rank == "Contributor" ? 2 : [1, 2], guildOrUserBadge);
        this.permittedSlot = rank == "Contributor" ? 2 : [1, 2];
    }

    public get json(): _PartnershipBadge {
        return flatten(this) as _PartnershipBadge;
    }
}