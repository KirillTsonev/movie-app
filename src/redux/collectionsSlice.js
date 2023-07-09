import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	moviesFavorite: [],
	favorite: [],
	watchlist: [],
	rated: [],
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
		resetCollectionsState() {
			return initialState;
		},
	},
});

export const {setFavorite, setWatchList, setRated, resetCollectionsState} = collectionsSlice.actions;
export default collectionsSlice;
