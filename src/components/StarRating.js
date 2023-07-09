import React, {useState, useEffect} from "react";
import {Box} from "@chakra-ui/react";

import useHandleRatings from "../api/useHandleRatings";
import useSelectors from "../redux/useSelectors";

import DeleteSvg from "./svg/DeleteSvg";

const StarRating = ({id}) => {
	const [hover, setHover] = useState(null);

	const {rating, setRating, handleRating} = useHandleRatings();
	const {rated} = useSelectors();

	useEffect(() => {
		for (let index = 0; index < rated.length; index++) {
			if (rated[index].id === id) {
				setRating(rated[index].rating);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rated]);

	return (
		<Box
			className="star-rating"
			alignItems="center"
			display="flex"
			justifyContent="space-between"
		>
			<DeleteSvg
				id={id}
				setRating={setRating}
			/>
			<Box display="flex">
				{[...Array(5)].map((star, index) => {
					const value = index + 1;

					return (
						<Box
							className="star"
							onClick={() => handleRating({id, value, method: "POST"})}
							onMouseEnter={() => setHover(value)}
							onMouseLeave={() => setHover(null)}
							key={index}
						>
							<svg
								data-rating={value}
								fill={value <= (hover || rating) ? "#edaa10" : "grey"}
								height={40}
								viewBox="0 0 25 25"
								width={40}
								style={{transition: "all .3s"}}
							>
								<polygon
									strokeWidth="0"
									points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
								/>
							</svg>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default StarRating;
