import React from "react";
import {Box, Text, Button} from "@chakra-ui/react";

import useSelectors from "../redux/useSelectors";
import MovieCard from "./MovieCard";

const CollectionsMoviesDisplay = ({paginate, isFetchingCollections}) => {
	const {movies, data, totalResults} = useSelectors();

	function renderMovies(arr) {
		const rows = [];

		arr.forEach((a) => {
			rows.push(
				<MovieCard
					key={a.id}
					movie={a}
					index={data.indexOf(a)}
				/>
			);
		});

		return rows;
	}

	return (
		<Box
			py="30px"
			mb="50px"
		>
			<Box
				display="grid"
				gridTemplate="330px / repeat(5, 220px)"
				justifyContent="space-between"
				gridAutoRows="330px"
				rowGap="10px"
			>
				{movies && renderMovies(movies)}
			</Box>
			{isFetchingCollections && (
				<Text
					textAlign="center"
					fontSize="25px"
					p="25px"
				>
					Loading...
				</Text>
			)}
			{!isFetchingCollections && movies.length < 100 && movies.length < totalResults && (
				<Button
					display="block"
					mx="auto"
					mt="20px"
					onClick={paginate}
				>
					Load more movies
				</Button>
			)}
		</Box>
	);
};

export default CollectionsMoviesDisplay;
