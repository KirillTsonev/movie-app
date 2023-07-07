import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	movies: "",
	data: "",
	results: "all",
	paginationIndex: 1,
	paginationSlice: 10,
	totalResults: 0,
	complexSearch: false,
};

const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		setMovies(state, action) {
			state.movies = action.payload;
		},
		setData(state, action) {
			state.data = action.payload;
		},
		setResults(state, action) {
			state.results = action.payload;
		},
		setPaginationIndex(state) {
			state.paginationIndex = state.paginationIndex + 1;
		},
		setPaginationSlice(state) {
			state.paginationSlice = state.paginationSlice + 10;
		},
		setTotalResults(state, action) {
			state.totalResults = action.payload;
		},
		setComplexSearch(state) {
			state.complexSearch = !state.complexSearch;
		},
		resetPagination(state) {
			state.paginationIndex = 1;
			state.paginationSlice = 10;
		},
	},
});

export const {
	setMovies,
	setData,
	setResults,
	setPaginationIndex,
	setPaginationSlice,
	setTotalResults,
	setComplexSearch,
	resetPagination,
} = homeSlice.actions;
export default homeSlice;
