import React from "react";
import {Box, Text, Button} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";

import useSelectors from "../redux/useSelectors";
import usePagination from "../hooks/usePagination";
import useFetchCollections from "../api/useFetchCollections";

import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import UpButton from "../components/UpButton";
import useClearData from "../hooks/useClearData";

const CollectionsPage = () => {
	const {movies, data, totalResults, paginationIndex} = useSelectors();
	const {errorCollections, isFetchingCollections, setCurrentCollection, currentCollection, refetchCollections} =
		useFetchCollections();
	const {paginate} = usePagination();
	const {clearData} = useClearData();

	function filterCollections(collection) {
		clearData("collection", refetchCollections);

		setCurrentCollection(collection);
	}

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
			<Box
				display="flex"
				justifyContent="space-around"
			>
				<Button
					w="30%"
					style={
						currentCollection === "favorite"
							? {
									background: "#17b824",
									transform: "translateX(5px) translateY(-5px)",
									boxShadow:
										"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
							  }
							: null
					}
					onClick={() => filterCollections("favorite")}
				>
					Favorites
				</Button>
				<Button
					w="30%"
					style={
						currentCollection === "watchlist"
							? {
									background: "#17b824",
									transform: "translateX(5px) translateY(-5px)",
									boxShadow:
										"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
							  }
							: null
					}
					onClick={() => filterCollections("watchlist")}
				>
					Watchlsit
				</Button>
				<Button
					w="30%"
					style={
						currentCollection === "rated"
							? {
									background: "#17b824",
									transform: "translateX(5px) translateY(-5px)",
									boxShadow:
										"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
							  }
							: null
					}
					onClick={() => filterCollections("rated")}
				>
					Rated
				</Button>
			</Box>
			{isFetchingCollections && paginationIndex === 1 ? (
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
						gridTemplate="330px / repeat(5, 220px)"
						justifyContent="space-between"
						gridAutoRows="330px"
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
			) : data.length === 0 ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					You don't have any movies in this collection yet, try adding some!
				</Text>
			) : null}
			<UpButton />
		</Box>
	);
};

export default CollectionsPage;
