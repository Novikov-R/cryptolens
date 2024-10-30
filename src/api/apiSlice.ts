import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AssetsResponse, AssetResponse, AssetHistoryResponse, Interval } from '../types/api';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
	endpoints: builder => ({
		getCoins: builder.query<AssetsResponse, { limit: number; offset: number }>({
			query: ({ limit, offset }) => `/assets?offset=${offset}&limit=${limit}`,
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