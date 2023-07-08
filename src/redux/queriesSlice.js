import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	title: "",
	genres: "",
	cast: "",
	year: "",
	complexSearch: false,
};

const queriesSlice = createSlice({
	name: "queries",
	initialState,
	reducers: {
		setTitle(state, action) {
			state.title = action.payload;
		},
		setGenres(state, action) {
			state.genres = action.payload;
		},
		setCast(state, action) {
			state.cast = action.payload;
		},
		setYear(state, action) {
			state.year = action.payload;
		},
		setComplexSearch(state) {
			state.complexSearch = !state.complexSearch;
		},
		resetQueriesState(state) {
			state.title = "";
			state.year = "";
			state.genres = "";
			state.cast = "";
		},
	},
});

export const {setTitle, setGenres, setCast, setYear, setComplexSearch, resetQueriesState} = queriesSlice.actions;
export default queriesSlice;
