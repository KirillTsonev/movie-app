import {configureStore, combineReducers} from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import queriesSlice from "./queriesSlice";

const rootReducer = combineReducers({
	home: homeSlice.reducer,
	queries: queriesSlice.reducer,
});

export const setupStore = (preloadedState) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
