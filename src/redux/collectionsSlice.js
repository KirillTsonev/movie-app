import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	moviesCollections: [],
	dataCollectionsStore: [],
	favorites: [],
	watchlist: [],
};

const collectionsSlice = createSlice({
	name: "collections",
	initialState,
	reducers: {
		setMoviesCollections(state, action) {
			state.moviesCollections = action.payload;
		},
		setDataCollectionsStore(state, action) {
			state.dataCollectionsStore = action.payload;
		},
		setFavorites(state, action) {
			state.favorites = action.payload;
		},
		setWatchList(state, action) {
			state.watchlist = action.payload;
		},
		resetCollectionsState() {
			return initialState;
		},
	},
});

export const {setMoviesCollections, setDataCollectionsStore, setFavorites, setWatchList, resetCollectionsState} =
	collectionsSlice.actions;
export default collectionsSlice;
