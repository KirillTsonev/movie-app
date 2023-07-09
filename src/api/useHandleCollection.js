import {useMutation} from "react-query";
import {useDispatch} from "react-redux";

import {headers, accountID} from "../constants";
import {setFavorite, setWatchList} from "../redux/collectionsSlice";

import useSelectors from "../redux/useSelectors";
import {setMovies} from "../redux/homeSlice";
import {setTotalResults} from "../redux/settingsSlice";

const useHandleCollection = () => {
	const dispatch = useDispatch();
	const addToCollection = useMutation({
		mutationFn: ({id, key, bool}) => postToCollection({id, key, bool}),
	});

	const {favorite, watchlist, movies, results} = useSelectors();

	async function postToCollection({id, key, bool}) {
		const options = {
			method: "POST",
			headers: {
				...headers,
				"content-type": "application/json",
			},
			body: JSON.stringify({
				media_type: "movie",
				media_id: id,
				[key]: bool,
			}),
		};

		return fetch(`https://api.themoviedb.org/3/account/${accountID}/${key}`, options).then((res) => res.json());
	}

	//If these functions are refactored to not repeat code, it would be one function which would take in 6 arguments so I left it as is
	function handleCollectionFavorite(id) {
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

						filterLocally(id);
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

						filterLocally(id);
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
		dispatch(setTotalResults(movies.length - 1));
	}

	return {handleCollectionFavorite, handleCollectionWatchlist, addToCollection};
};

export default useHandleCollection;
