import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AssetsResponse, AssetResponse, AssetHistoryResponse, Interval } from '../types/api';
import { Asset } from '../types/asset';
import { setCoins, setError, setLoading } from '../slices/coinSlice.ts';

const transformAssetData = (data: Asset): Asset => {
	return {
		...data,
		rank: Number(data.rank),
		supply: Number(data.supply),
		maxSupply: Number(data.maxSupply),
		marketCapUsd: Number(data.marketCapUsd),
		volumeUsd24Hr: Number(data.volumeUsd24Hr),
		priceUsd: Number(data.priceUsd),
		changePercent24Hr: Number(data.changePercent24Hr),
		vwap24Hr: Number(data.vwap24Hr),
	};
};


export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
	endpoints: builder => ({
		getCoins: builder.query<AssetsResponse, { limit?: number; offset?: number, search?: string | null }>({
			query: ({ limit = 100, offset = 0, search }) => {
				const searchString = search ? `&search=${search}` : '';
				return `/assets?offset=${offset}&limit=${limit}${searchString}`;
			},
			keepUnusedDataFor: 0,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					const { data } = await queryFulfilled;
					dispatch(setCoins(data.data));
					dispatch(setError(false));
				} catch (e) {
					console.error(e);
					dispatch(setError(true));
				} finally {
					dispatch(setLoading(false));
				}
			},
			transformResponse: (response: AssetsResponse) => ({
				...response,
				data: response.data.map(transformAssetData),
			}),
		}),
		getCoin: builder.query<AssetResponse, string>({
			query: (id: string) => `/assets/${id}`,
		}),
		getCoinHistory: builder.query<AssetHistoryResponse, { id: string; interval: Interval }>({
			query: ({ id, interval }) => `/assets/${id}/history?interval=${interval}`,
		}),
	}),
});

export const { useGetCoinsQuery, useGetCoinQuery, useGetCoinHistoryQuery } = apiSlice;

export default apiSlice;