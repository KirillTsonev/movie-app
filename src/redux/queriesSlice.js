import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	title: "",
	genresStore: "",
	castStore: "",
	yearStore: "",
};

const queriesSlice = createSlice({
	name: "queries",
	initialState,
	reducers: {
		setTitle(state, action) {
			state.title = action.payload;
		},
		setGenresStore(state, action) {
			state.genresStore = action.payload;
		},
		setCastStore(state, action) {
			state.castStore = action.payload;
		},
		setYearStore(state, action) {
			state.yearStore = action.payload;
		},
		resetQueriesState() {
			return initialState;
		},
	},
});

export const {setTitle, setGenresStore, setCastStore, setYearStore, resetQueriesState} = queriesSlice.actions;
export default queriesSlice;
