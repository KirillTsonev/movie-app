import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	favorite: "",
	watchlist: "",
	rated: "",
	details: "",
};

const collectionsSlice = createSlice({
	name: "collections",
	initialState,
	reducers: {
		setFavorite(state, action) {
			state.favorite = action.payload;
		},
		setWatchList(state, action) {
			state.watchlist = action.payload;
		},
		setRated(state, action) {
			state.rated = action.payload;
		},
		setDetails(state, action) {
			state.details = action.payload;
		},
		resetCollectionsState() {
			return initialState;
		},
	},
});

export const {setFavorite, setWatchList, setRated, setDetails, resetCollectionsState} = collectionsSlice.actions;
export default collectionsSlice;
