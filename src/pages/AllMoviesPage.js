import React from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";
import {useDispatch} from "react-redux";

import useGetPlayingNow from "../api/useGetPlayingNow";
import useSearchBarSimple from "../api/useSearchBarSimple";
import useSearchBarComplex from "../api/useSearchBarComplex";
import usePagination from "../hooks/usePagination";
import useSelectors from "../redux/useSelectors";

import {setSearched, setComplexSearch} from "../redux/settingsSlice";

import NavBar from "../components/NavBar";
import SearchBarSimple from "../components/SearchBarSimple";
import SearchBarComplex from "../components/SearchBarComplex";
import MovieCard from "../components/MovieCard";

const AllMoviesPage = () => {
	const {isLoadingPlaying, errorPlaying, setPaginationIndex} = useGetPlayingNow();
	const {isLoadingSearchSimple, errorSearchSimple} = useSearchBarSimple();
	const {isLoadingSearchComplex, errorSearchComplex, dataSearchComplex} = useSearchBarComplex();
	const {movies, data, complexSearch, searched, totalResults} = useSelectors();
	const {paginate} = usePagination();

	const dispatch = useDispatch();

	//up button and smooth scroll
	//clear search
	//searched to store to persist

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

	function clearSearch() {
		dispatch(setSearched(false));

		setPaginationIndex(1);
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
				w="100%"
				position="relative"
			>
				<SearchBarComplex
					complexSearch={complexSearch}
					setSearched={setSearched}
				/>
				<SearchBarSimple
					complexSearch={complexSearch}
					setSearched={setSearched}
				/>
				<Button
					mx="auto"
					w="145px"
					onClick={() => dispatch(setComplexSearch())}
				>
					{complexSearch ? "Simple search" : "Complex search"}
				</Button>
				<Button
					position="absolute"
					left="calc(100% + 30px)"
					top="50px"
					display={searched ? "block" : "none"}
					onClick={clearSearch}
				>
					Clear Search
				</Button>
			</Box>
			{isLoadingPlaying || isLoadingSearchSimple || isLoadingSearchComplex ? (
				<Box
					display="flex"
					justifyContent="center"
					pt="20px"
				>
					<SpinnerDotted size={"50%"} />
				</Box>
			) : errorPlaying ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					There is a problem with our servers, please try again later!
				</Text>
			) : errorSearchSimple || errorSearchComplex ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					{errorSearchComplex.message === "result.results[0] is undefined"
						? "No such cast found, try another query!"
						: "There is a problem with our servers, please try again later!"}
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
			) : dataSearchComplex?.results.length === 0 ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					No movies could be found using your queries, try different ones!
				</Text>
			) : null}
		</Box>
	);
};

export default AllMoviesPage;
