import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	movies: "",
	data: "",
	results: "all",
	paginationSlice: 10,
	totalResults: 0,
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
		setPaginationSlice(state) {
			state.paginationSlice = state.paginationSlice + 10;
		},
		setTotalResults(state, action) {
			state.totalResults = action.payload;
		},
		resetHomeState() {
			return initialState;
		},
	},
});

export const {setMovies, setData, setResults, setPaginationSlice, setTotalResults, resetHomeState} = homeSlice.actions;
export default homeSlice;
