import { flatten } from "discord.js";
export { _Generalbadge, GeneralBadge } from "./badges/GeneralBadge";
export { RankedBadge, _RankedBadge } from "./badges/RankedBadge";
export { LevelBadge, _LevelBadge } from "./badges/LevelBadge";
export { StaffBadge, _StaffBadge } from "./badges/StaffBadge";
export { PartnershipBadge, _PartnershipBadge, PartnerTypes } from "./badges/PartnershipBadge";

import { _Generalbadge, GeneralBadge } from "./badges/GeneralBadge";
import { RankedBadge, _RankedBadge } from "./badges/RankedBadge";
import { LevelBadge, _LevelBadge } from "./badges/LevelBadge";
import { StaffBadge, _StaffBadge } from "./badges/StaffBadge";
import { PartnershipBadge, _PartnershipBadge } from "./badges/PartnershipBadge";

export type BadgeTypes = "RANKED" | "LEVEL" | "STAFF" | "PARTNERSHIP" | "GENERAL"
export type BadgePermittedSlot = 1 | 2 | 3 | (1 | 2 | 3)[];
export type GuildOrUserBadge = "USER" | "GUILD";
export type Badge = GeneralBadge | RankedBadge | LevelBadge | StaffBadge | PartnershipBadge;

export interface _BaseBadge {
    badgeCode: string;
    type: BadgeTypes;
    permittedSlot: BadgePermittedSlot;
    guildOrUserBadge: GuildOrUserBadge;
}

export class BaseBadge {
    private _active?: boolean;
    private _activeSlot?: number;

    constructor(
        public badgeCode: string,
        public type: BadgeTypes,
        public permittedSlot: BadgePermittedSlot,
        public guildOrUserBadge: GuildOrUserBadge
    ) {};

    public get active(): boolean {
        return (this._active == null || this._active == undefined) ? 
        false : this._active; // If b is undefined or null, set it to false.
    }

    public set active(b: boolean) {
        this._active = (b == null || b == undefined) ?
        false : b;
    }

    public get slotNumber(): number | null {
        return (this._activeSlot == null || this._activeSlot == undefined) ?
        null : this._activeSlot;
    }

    public get json(): _BaseBadge {
        return flatten(this) as _BaseBadge;
    }
}