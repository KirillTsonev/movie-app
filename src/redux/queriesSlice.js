import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	results: "all",
	title: "",
	genres: "",
	cast: "",
	year: "",
};

const queriesSlice = createSlice({
	name: "queries",
	initialState,
	reducers: {
		setResults(state, action) {
			state.results = action.payload;
		},
		setComplexQueries(state, action) {
			state.results = "complex";
			state.genres = action.payload.selectedGenres;
			state.cast = action.payload.castState;
			state.year = action.payload.yearState;
		},
		setSimpleQueries(state, action) {
			state.results = "simple";
			state.title = action.payload;
		},
		setGenres(state, action) {
			state.genres = action.payload;
		},
		resetQueries(state) {
			state.title = "";
			state.genres = [];
			state.cast = "";
			state.year = "";
		},
	},
});

export const {setResults, setComplexQueries, setSimpleQueries, resetQueries, setGenres} = queriesSlice.actions;
export default queriesSlice;
