export type Asset = {
    id: string;
    rank: number;
    symbol: string;
    name: string;
    supply: number;
    maxSupply: number;
    marketCapUsd: number;
    volumeUsd24Hr: number;
    priceUsd: number;
    changePercent24Hr: number;
    vwap24Hr: number;
    explorer: string;
};

export type AssetHistory = {
    priceUsd: number;
    time: number;
    circulatingSupply: number;
    date: string;
};
