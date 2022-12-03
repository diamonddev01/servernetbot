import { flatten } from "discord.js";
import { BaseBadge, GuildOrUserBadge, _BaseBadge } from "../Badge";

export interface _Generalbadge extends _BaseBadge {
    type: "GENERAL";
    permittedSlot: (2 | 3)[] | 2 | 3;
}

export class GeneralBadge extends BaseBadge {
    public type: "GENERAL" = "GENERAL";
    public permittedSlot: (2 | 3)[] | 2 | 3;

    constructor(
        badgeCode: string,
        permittedSlot: (2 | 3)[] | 2 | 3,
        guildOrUserBadge: GuildOrUserBadge
    ) {
        super(badgeCode, "GENERAL", permittedSlot, guildOrUserBadge);
        this.permittedSlot = permittedSlot;
    }

    public get json(): _Generalbadge {
        return flatten(this) as _Generalbadge;
    }
}