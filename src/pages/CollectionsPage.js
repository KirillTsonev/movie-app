import React from "react";
import {Box, Text, Button} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";

import useSelectors from "../redux/useSelectors";
import usePagination from "../hooks/usePagination";
import useFetchCollections from "../api/useFetchCollections";

import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import UpButton from "../components/UpButton";

const CollectionsPage = () => {
	const {movies, data, totalResults} = useSelectors();
	const {errorCollections, isLoadingCollections} = useFetchCollections();
	const {paginate} = usePagination();

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
			w="1140px"
			my="0"
			mx="auto"
		>
			<NavBar />

			{isLoadingCollections ? (
				<Box
					display="flex"
					justifyContent="center"
					pt="20px"
				>
					<SpinnerDotted size={"50%"} />
				</Box>
			) : errorCollections ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					There is a problem with our servers, please try again later!
				</Text>
			) : movies.length > 0 ? (
				<Box
					py="30px"
					mb="50px"
				>
					<Box
						display="grid"
						gridTemplate="380px / repeat(5, 220px)"
						justifyContent="space-between"
						gridAutoRows="380px"
						rowGap="10px"
					>
						{movies && renderMovies(movies)}
					</Box>
					{movies.length < 100 && movies.length < totalResults && (
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
			) : null}
			<UpButton />
		</Box>
	);
};

export default CollectionsPage;
