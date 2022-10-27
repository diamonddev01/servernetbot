export interface HelpData_display {
    MessageUsage?: string;
    InteractionUsage?: string;
    Category: helpMenus;
    Display: true
}

export interface HelpData_hide {
    MessageUsage?: string;
    InteractionUsage?: string;
    Display: false
}

export type HelpData = HelpData_display | HelpData_hide;

export type helpMenus = '';