import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
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

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
	return typeof error === 'object' && error != null && 'status' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
	return typeof error === 'object' && error != null && 'message' in error;
}


export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
	endpoints: builder => ({
		getCoins: builder.query<AssetsResponse, { limit?: number; offset?: number }>({
			query: ({ limit = 100, offset = 0 }) => `/assets?offset=${offset}&limit=${limit}`,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					const { data } = await queryFulfilled;
					dispatch(setCoins(data.data));
					dispatch(setError(null));
				} catch (error: unknown) {
					if (isFetchBaseQueryError(error) || isSerializedError(error)) {
						dispatch(setError(error));
					} else {
						dispatch(setError({ message: 'Неизвестная ошибка' } as SerializedError));
					}
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