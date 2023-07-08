import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	movies: [],
	data: [],
	paginationSlice: 10,
	paginationIndex: 1,
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
		setPaginationSlice(state) {
			state.paginationSlice = state.paginationSlice + 10;
		},
		setPaginationIndex(state) {
			state.paginationIndex = state.paginationIndex + 1;
		},
		resetHomeState() {
			return initialState;
		},
	},
});

export const {setMovies, setData, setPaginationSlice, setPaginationIndex, resetHomeState} = homeSlice.actions;
export default homeSlice;
