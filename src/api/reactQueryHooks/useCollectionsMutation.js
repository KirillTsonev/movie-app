import {useMutation} from "react-query";
import {useDispatch} from "react-redux";

import useSelectors from "../../redux/useSelectors";
import postToCollection from "../fetches/fetchPostCollection";
import {setMovies} from "../../redux/homeSlice";
import {setResultsFilter} from "../../redux/settingsSlice";
import {setFavorite, setWatchList} from "../../redux/collectionsSlice";

const useHandleCollection = () => {
	const dispatch = useDispatch();
	const addToCollection = useMutation({
		mutationFn: ({id, key, bool}) => postToCollection({id, key, bool}),
	});

	const {favorite, watchlist, movies, results} = useSelectors();

	//If these functions are refactored to not repeat code, it would be one function which would take in 6 arguments so I left it as is
	async function handleCollectionFavorite(id) {
		if (favorite.includes(id)) {
			addToCollection.mutate(
				{id, key: "favorite", bool: false},
				{
					onSettled: () => {
						dispatch(setFavorite(favorite.filter((a) => a !== id)));

						if (results === "collection") {
							filterLocally(id);
						}
					},
				}
			);
		} else if (watchlist.includes(id)) {
			addToCollection.mutate({id, key: "favorite", bool: true});
			addToCollection.mutate(
				{id, key: "watchlist", bool: false},
				{
					onSettled: () => {
						dispatch(setFavorite([...favorite, id]));
						dispatch(setWatchList(watchlist.filter((a) => a !== id)));

						if (results === "collection") {
							filterLocally(id);
						}
					},
				}
			);
		} else {
			addToCollection.mutate(
				{id, key: "favorite", bool: true},
				{
					onSuccess: () => {
						dispatch(setFavorite([...favorite, id]));
					},
				}
			);
		}
	}

	async function handleCollectionWatchlist(id) {
		if (watchlist.includes(id)) {
			addToCollection.mutate(
				{id, key: "watchlist", bool: false},
				{
					onSettled: () => {
						dispatch(setWatchList(watchlist.filter((a) => a !== id)));

						if (results === "collection") {
							filterLocally(id);
						}
					},
				}
			);
		} else if (favorite.includes(id)) {
			addToCollection.mutate({id, key: "favorite", bool: false});
			addToCollection.mutate(
				{id, key: "watchlist", bool: true},
				{
					onSettled: async () => {
						dispatch(setWatchList([...watchlist, id]));
						dispatch(setFavorite(favorite.filter((a) => a !== id)));

						if (results === "collection") {
							filterLocally(id);
						}
					},
				}
			);
		} else {
			addToCollection.mutate(
				{id, key: "watchlist", bool: true},
				{
					onSuccess: () => {
						dispatch(setWatchList([...watchlist, id]));
					},
				}
			);
		}
	}

	function filterLocally(id) {
		dispatch(setMovies(movies.filter((a) => a.id !== id)));
		dispatch(setResultsFilter(movies.length - 1));
	}

	return {handleCollectionFavorite, handleCollectionWatchlist, addToCollection};
};

export default useHandleCollection;
