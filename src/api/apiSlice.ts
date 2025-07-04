import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AssetHistoryResponse, AssetResponse, AssetsResponse, Interval } from '../types/api';
import { Asset, AssetHistory } from '../types/asset';
import { setCoin, setCoins, setCoinUpdates } from '../slices/coinSlice.ts';

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
        vwap24Hr: Number(data.vwap24Hr)
    };
};

const transformHistoryAssetData = (data: AssetHistory[]): AssetHistory[] => {
    return data.map((history) => {
        let price = Number(history.priceUsd);
        price = price % 1 === 0 ? price : Number(price.toFixed(8));
        return {
            ...history,
            priceUsd: price,
            time: Number(history.time),
            circulatingSupply: Number(history.circulatingSupply)
        };
    });
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://rest.coincap.io/v3/' }),
    endpoints: (builder) => ({
        getCoins: builder.query<AssetsResponse, { limit?: number; offset?: number; search?: string | null }>({
            query: ({ limit = 100, offset = 0, search }) => {
                const searchString = search ? `&search=${search}` : '';
                return `/assets?offset=${offset}&limit=${limit}${searchString}&apiKey=922270bf460c0c898a76c468c877e25dd12e4fc1761064b38911e4be232d2760`;
            },
            keepUnusedDataFor: 0,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCoins(data.data));
                } catch (e) {
                    console.error(e);
                }
            },
            transformResponse: (response: AssetsResponse) => ({
                ...response,
                data: response.data.map(transformAssetData)
            })
        }),
        getCoin: builder.query<AssetResponse, string>({
            query: (id: string) => `/assets/${id}?apiKey=922270bf460c0c898a76c468c877e25dd12e4fc1761064b38911e4be232d2760`,
            keepUnusedDataFor: 0,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCoin(data.data));
                } catch (e) {
                    console.error(e);
                }
            },
            transformResponse: (response: AssetResponse) => ({
                ...response,
                data: transformAssetData(response.data)
            })
        }),
        getCoinHistory: builder.query<AssetHistoryResponse, { id: string; interval: Interval }>({
            query: ({ id, interval }) => `/assets/${id}/history?interval=${interval}&apiKey=922270bf460c0c898a76c468c877e25dd12e4fc1761064b38911e4be232d2760`,
            transformResponse: (response: AssetHistoryResponse) => ({
                ...response,
                data: transformHistoryAssetData(response.data)
            })
        }),
        getTopCoins: builder.query<AssetsResponse, number>({
            query: (limit) => `/assets?limit=${limit}&apiKey=922270bf460c0c898a76c468c877e25dd12e4fc1761064b38911e4be232d2760`,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCoinUpdates(data.data));
                } catch (e) {
                    console.error(e);
                }
            },
            transformResponse: (response: AssetsResponse) => ({
                ...response,
                data: response.data.map(transformAssetData)
            })
        })
    })
});

export const { useGetCoinsQuery, useGetCoinQuery, useGetCoinHistoryQuery, useGetTopCoinsQuery } = apiSlice;
