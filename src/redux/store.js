import {configureStore, combineReducers} from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import queriesSlice from "./queriesSlice";
import settingsSlice from "./settingsSlice";

const rootReducer = combineReducers({
	home: homeSlice.reducer,
	queries: queriesSlice.reducer,
	settings: settingsSlice.reducer,
});

export const setupStore = (preloadedState) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
