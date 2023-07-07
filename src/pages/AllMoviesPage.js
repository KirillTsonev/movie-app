import React from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";
import {useDispatch} from "react-redux";

import useGetPlayingNow from "../api/useGetPlayingNow";
import useSearchBarSimple from "../api/useSearchBarSimple";
import useSearchBarComplex from "../api/useSearchBarComplex";
import usePagination from "../hooks/usePagination";
import useSelectors from "../redux/useSelectors";

import {setComplexSearch} from "../redux/homeSlice";

import NavBar from "../components/NavBar";
import SearchBarSimple from "../components/SearchBarSimple";
import SearchBarComplex from "../components/SearchBarComplex";
import MovieCard from "../components/MovieCard";

const AllMoviesPage = () => {
	const {isLoadingPlaying, errorPlaying} = useGetPlayingNow();
	const {isLoadingSearchSimple, errorSearchSimple} = useSearchBarSimple();
	const {isLoadingSearchComplex, errorSearchComplex} = useSearchBarComplex();
	const {movies, data, complexSearch, totalResults} = useSelectors();
	const {paginate} = usePagination();
	const dispatch = useDispatch();

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
				w="100%"
			>
				<SearchBarComplex complexSearch={complexSearch} />
				<SearchBarSimple complexSearch={complexSearch} />
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
					onClick={() => dispatch(setComplexSearch())}
				>
					{complexSearch ? "Simple search" : "Complex search"}
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
			) : errorPlaying || errorSearchSimple || errorSearchComplex ? (
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
						{movies && renderMovies(movies)}
					</Box>
					{movies.length < 100 && movies.length < totalResults && (
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
							onClick={paginate}
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
