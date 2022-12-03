export type NumberUpToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NumberUpToTen_IncludingTen = NumberUpToTen | 10;
export type NumberUpToTen_IncludingZero = NumberUpToTen | 0;
export type NumberUpToTen_IncludingTenAndZero = NumberUpToTen_IncludingTen | NumberUpToTen_IncludingZero;