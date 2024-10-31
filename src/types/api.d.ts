import { Asset, AssetHistory } from './asset';

export type Interval = 'm1' | 'm5' | 'm15' | 'm30' | 'h1' | 'h2' | 'h6' | 'h12' | 'd1';

type WithTimestamp<T> = {
	data: T;
	timestamp: number;
};


export type AssetResponse = WithTimestamp<Asset>;
export type AssetsResponse = WithTimestamp<Asset[]>;

export type AssetHistoryResponse = WithTimestamp<AssetHistory[]>;
