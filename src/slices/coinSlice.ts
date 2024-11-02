import {
	createSlice,
	createEntityAdapter,
	EntityState,
	Update,
	PayloadAction,
} from '@reduxjs/toolkit';
import { Asset } from '../types/asset';
import { ActiveFilter, Filter, SearchValue } from '../types/filter';

const coinsAdapter = createEntityAdapter<Asset>();

type State = EntityState<Asset, string> & {
	activeFilter: ActiveFilter,
	selectedCoin: string | null,
	searchValue: SearchValue,
};

const initialState: State = coinsAdapter.getInitialState({
	activeFilter: {
		filter: 'rank',
		reverse: false,
	},
	selectedCoin: null,
	searchValue: null,
});

const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {
		setCoins: coinsAdapter.setAll,
		setCoin: coinsAdapter.setOne,
		setActiveFilter: (state, action: PayloadAction<Filter>) => {
			if (state.activeFilter.filter === action.payload) {
				state.activeFilter.reverse = !state.activeFilter.reverse;
			} else {
				state.activeFilter.reverse = false;
				state.activeFilter.filter = action.payload;
			}

		},
		setSelectedCoin: (state, action: PayloadAction<string>) => {
			state.selectedCoin = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<SearchValue>) => {
			state.searchValue = action.payload;
		},
		setCoinUpdates: (state, action: PayloadAction<{ id: string, priceUsd: number }[]>) => {
			const updates: Update<Asset, string>[] = action.payload.map(({ id, priceUsd }) => ({
				id,
				changes: { priceUsd },
			}));
			coinsAdapter.updateMany(state, updates);
		},
	},
});

export const {
	setCoins,
	setCoin,
	setActiveFilter,
	setCoinUpdates,
	setSearchValue,
	setSelectedCoin,
} = coinsSlice.actions;

export const {
	selectAll: selectAllCoins,
	selectById: selectCoinById,
} = coinsAdapter.getSelectors((state: { coins: State }) => state.coins);

export default coinsSlice.reducer;