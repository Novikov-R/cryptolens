export type Interval = 'm1' | 'm5' | 'm15' | 'm30' | 'h1' | 'h2' | 'h6' | 'h12' | 'd1';

type Asset = {
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


type WithTimestamp<T> = {
	data: T;
	timestamp: number;
};


export type AssetResponse = WithTimestamp<Asset>;
export type AssetsResponse = WithTimestamp<Asset[]>;

type AssetHistory = {
	priceUsd: number;
	time: number;
	circulatingSupply: number;
	date: string;
};

export type AssetHistoryResponse = WithTimestamp<AssetHistory[]>;
