export type Filter = 'rank' | 'marketCapUsd' | 'priceUsd' | 'changePercent24Hr';

export interface ActiveFilter {
    filter: Filter;
    reverse: boolean;
}

export type SearchValue = null | string;
