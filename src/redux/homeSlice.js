import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	movies: "",
	data: "",
	paginationSlice: 10,
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
		resetHomeState() {
			return initialState;
		},
	},
});

export const {setMovies, setData, setPaginationSlice, setPaginationIndex, resetHomeState} = homeSlice.actions;
export default homeSlice;
