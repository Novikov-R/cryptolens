import { createSlice, createEntityAdapter, EntityState, SerializedError, Update } from '@reduxjs/toolkit';
import { Asset } from '../types/asset';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const coinsAdapter = createEntityAdapter<Asset>();

type State = EntityState<Asset, string> & {
	activeFilter: 'rank' | 'marketCapUsd' | 'priceUsd' | 'changePercent24Hr',
	loading: boolean,
	error: FetchBaseQueryError | SerializedError | null
};

const initialState: State = coinsAdapter.getInitialState({
	loading: false,
	error: null,
	activeFilter: 'rank',
});

const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {
		setCoins: coinsAdapter.setAll,
		setActiveFilter: (state, action) => {
			state.activeFilter = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setCoinUpdates: (state, action) => {
			const updates: Update<Asset, string>[] = action.payload.map(({ id, priceUsd }: { id: string, priceUsd: number }) => ({
				id,
				changes: { priceUsd },
			}));
			coinsAdapter.updateMany(state, updates);
		},
	},
});

export const { setCoins, setActiveFilter, setLoading, setError, setCoinUpdates } = coinsSlice.actions;

export const {
	selectAll: selectAllCoins,
	selectById: selectCoinById,
} = coinsAdapter.getSelectors((state: { coins: State }) => state.coins);

export default coinsSlice.reducer;