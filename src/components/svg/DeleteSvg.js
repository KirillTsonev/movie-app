import React, {useState} from "react";
import {useDispatch} from "react-redux";

import useHandleRatings from "../../api/reactQueryHooks/useRatingsMutation";
import useSelectors from "../../redux/useSelectors";
import {setRated} from "../../redux/collectionsSlice";
import {setTotalResults} from "../../redux/settingsSlice";
import {setMovies} from "../../redux/homeSlice";

const DeleteSvg = ({id, setRating}) => {
	const [hover, setHover] = useState(false);

	const dispatch = useDispatch();

	const {setRatingApi} = useHandleRatings();
	const {rated, results, movies} = useSelectors();

	function handleDeleteRating(id) {
		setRating(0);

		dispatch(setRated(rated.filter((a) => a.id !== id)));

		if (results === "collection") {
			dispatch(setMovies(movies.filter((a) => a.id !== id)));
			dispatch(setTotalResults(movies.length - 1));
		}
	}

	return (
		<svg
			width="30px"
			height="30px"
			viewBox="0 0 60 60"
			cursor="pointer"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() =>
				setRatingApi.mutate(
					{id, undefined, method: "DELETE"},
					{
						onSuccess: () => {
							handleDeleteRating(id);
						},
					}
				)
			}
			style={
				rated && !rated.map((a) => a.id).includes(id)
					? {pointerEvents: "none", filter: "grayscale(1) brightness(.5)"}
					: null
			}
		>
			<path
				style={
					hover
						? {fill: "#eb284d", fillRule: "evenodd", transition: "all .4s"}
						: {fill: "#9f4c4c", fillRule: "evenodd", transition: "all .4s"}
				}
				d="M940,510a30,30,0,1,1,30-30A30,30,0,0,1,940,510Zm15-20.047A3.408,3.408,0,0,1,955,494.77l-0.221.22a3.42,3.42,0,0,1-4.833,0l-8.764-8.755a1.71,1.71,0,0,0-2.417,0l-8.741,8.747a3.419,3.419,0,0,1-4.836,0l-0.194-.193a3.408,3.408,0,0,1,.017-4.842l8.834-8.735a1.7,1.7,0,0,0,0-2.43l-8.831-8.725a3.409,3.409,0,0,1-.018-4.844l0.193-.193a3.413,3.413,0,0,1,2.418-1c0.944,0,3.255,1.835,3.872,2.455l7.286,7.287a1.708,1.708,0,0,0,2.417,0l8.764-8.748a3.419,3.419,0,0,1,4.832,0L955,465.243a3.408,3.408,0,0,1,0,4.818l-8.727,8.737a1.7,1.7,0,0,0,0,2.407Z"
				transform="translate(-910 -450)"
			/>
		</svg>
	);
};

export default DeleteSvg;
