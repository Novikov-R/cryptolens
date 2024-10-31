import { apiSlice } from '../api/apiSlice';
import coinSlice from '../slices/coinSlice.ts';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		coins: coinSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
