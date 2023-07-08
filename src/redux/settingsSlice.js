import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	searched: false,
	complexSearch: false,
	totalResults: 0,
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setComplexSearch(state) {
			state.complexSearch = !state.complexSearch;
		},
		setSearched(state, action) {
			state.searched = action.payload;
		},
		setTotalResults(state, action) {
			state.totalResults = action.payload;
		},
	},
});

export const {setComplexSearch, setSearched, setTotalResults} = settingsSlice.actions;
export default settingsSlice;
