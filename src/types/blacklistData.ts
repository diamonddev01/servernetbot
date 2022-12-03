export interface blacklistdata {
    active?: {
        reason: string;
        addedBy: string;
        duration: number;
        permanant: boolean;
        end: number;
        start: number;
    };
    past?: {
        reason: string;
        addedBy: string;
        duration: number;
        permanant: boolean;
        end: number;
        start: number;
    }[];
}