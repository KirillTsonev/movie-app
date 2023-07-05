import React from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";

import useGetPlayingNow from "../api/useGetPlayingNow";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const AllMoviesPage = () => {
	const {isLoading, error, movies, handlePaginate, data, setMovies} = useGetPlayingNow();

	function renderMovies(arr) {
		const rows = [];

		arr.forEach((a) => {
			rows.push(
				<MovieCard
					key={a.id}
					movie={a}
					index={data.results.indexOf(a)}
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
			<SearchBar setMovies={setMovies} />
			{isLoading ? (
				<Box
					display="flex"
					justifyContent="center"
					pt="20px"
				>
					<SpinnerDotted size={"50%"} />
				</Box>
			) : error ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					There are problems with our servers, please try again later.
				</Text>
			) : (
				<Box py="30px">
					<Box
						display="grid"
						gridTemplate="380px / repeat(5, 220px)"
						justifyContent="space-between"
						gridAutoRows="380px"
						rowGap="10px"
					>
						{renderMovies(movies)}
					</Box>
					{movies.length < 100 && (
						<Button
							display="block"
							mx="auto"
							bg="#00c0f7"
							transition="all .4s"
							_hover={{
								background: "#17b824",
								transform: "translateX(5px) translateY(-5px)",
								boxShadow:
									"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
							}}
							mt="20px"
							onClick={() => handlePaginate()}
						>
							Load more movies
						</Button>
					)}
				</Box>
			)}
		</Box>
	);
};

export default AllMoviesPage;
