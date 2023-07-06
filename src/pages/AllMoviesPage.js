import React, {useState, useContext} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";

import useGetPlayingNow from "../api/useGetPlayingNow";
import useSearchBarSimple from "../api/useSearchBarSimple";

import {MoviesContext} from "../context/moviesContext";

import NavBar from "../components/NavBar";
import SearchBarSimple from "../components/SearchBarSimple";
import SearchBarComplex from "../components/SearchBarComplex";
import MovieCard from "../components/MovieCard";

const AllMoviesPage = () => {
	const [complexSearch, setComplexSearch] = useState(false);
	const [searched, setSearched] = useState(false);

	const {isLoadingPlaying, errorPlaying, paginatePlaying, dataPlaying} = useGetPlayingNow();
	const {isLoadingSearch, errorSearch, paginateSearch} = useSearchBarSimple();

	const {movies} = useContext(MoviesContext);

	function renderMovies(arr) {
		const rows = [];

		arr.forEach((a) => {
			rows.push(
				<MovieCard
					key={a.id}
					movie={a}
					index={dataPlaying.results.indexOf(a)}
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
			<Box display="flex">
				{complexSearch ? (
					<SearchBarComplex setSearched={setSearched} />
				) : (
					<SearchBarSimple setSearched={setSearched} />
				)}
				<Button
					mx="auto"
					bg="#00c0f7"
					w="145px"
					transition="background transform .4s"
					_hover={{
						background: "#17b824",
						transform: "translateX(5px) translateY(-5px)",
						boxShadow:
							"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
					}}
					onClick={() => setComplexSearch(!complexSearch)}
				>
					{complexSearch ? "Simple search" : "Complex search"}
				</Button>
			</Box>
			{isLoadingPlaying || isLoadingSearch ? (
				<Box
					display="flex"
					justifyContent="center"
					pt="20px"
				>
					<SpinnerDotted size={"50%"} />
				</Box>
			) : errorPlaying || errorSearch ? (
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
					{(!searched && movies.length < 100) || (searched && movies.length === 10) ? (
						<Button
							display="block"
							mx="auto"
							bg="#00c0f7"
							transition="background transform .4s"
							_hover={{
								background: "#17b824",
								transform: "translateX(5px) translateY(-5px)",
								boxShadow:
									"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
							}}
							mt="20px"
							onClick={searched ? paginateSearch : paginatePlaying}
						>
							Load more movies
						</Button>
					) : null}
				</Box>
			)}
		</Box>
	);
};

export default AllMoviesPage;
