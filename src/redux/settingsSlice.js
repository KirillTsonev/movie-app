import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	searched: false,
	complexSearch: false,
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
	},
});

export const {setComplexSearch, setSearched} = settingsSlice.actions;
export default settingsSlice;
