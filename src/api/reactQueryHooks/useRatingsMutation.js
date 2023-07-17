import {useState} from "react";
import {useMutation} from "react-query";
import {useDispatch} from "react-redux";

import useHandleCollection from "./useCollectionsMutation";
import useSelectors from "../../redux/useSelectors";
import postRating from "../fetches/fetchRatingsPost";
import {setRated, setWatchList} from "../../redux/collectionsSlice";

const useHandleRatings = () => {
	const [rating, setRating] = useState(0);

	const dispatch = useDispatch();
	const setRatingApi = useMutation({
		mutationFn: ({id, value, method}) => postRating({id, value, method}),
	});

	const {watchlist, rated} = useSelectors();
	const {addToCollection} = useHandleCollection();

	function handleRating({id, value, method}) {
		setRating(value);

		setRatingApi.mutate({id, value, method});

		dispatch(setRated([...rated, {id, rating: value}]));

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
