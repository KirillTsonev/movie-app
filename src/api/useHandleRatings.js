import {useState} from "react";
import {useMutation} from "react-query";
import {useDispatch} from "react-redux";

import useHandleCollection from "./useHandleCollection";
import useSelectors from "../redux/useSelectors";
import {headers} from "../constants";
import {setWatchList} from "../redux/collectionsSlice";

const useHandleRatings = () => {
	const [rating, setRating] = useState(0);

	const dispatch = useDispatch();
	const setRatingApi = useMutation({
		mutationFn: ({id, value, method}) => postRating({id, value, method}),
	});

	const {watchlist} = useSelectors();
	const {addToCollection} = useHandleCollection();

	async function postRating({id, value, method}) {
		const options = {
			method,
			headers: {
				...headers,
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({value}),
		};

		fetch(`https://api.themoviedb.org/3/movie/${id}/rating`, options).then((response) => response.json());
	}

	function handleRating({id, value, method}) {
		setRating(value);

		setRatingApi.mutate({id, value, method});

		if (watchlist.includes(id)) {
			addToCollection.mutate(
				{id, key: "watchlist", bool: false},
				{
					onSuccess: () => {
						dispatch(setWatchList(watchlist.filter((a) => a !== id)));
					},
				}
			);
		}
	}

	return {rating, setRating, handleRating, setRatingApi};
};

export default useHandleRatings;
