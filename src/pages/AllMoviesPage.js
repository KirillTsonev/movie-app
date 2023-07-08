import React, {useState} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";
import {useDispatch} from "react-redux";

import useGetPlayingNow from "../api/useGetPlayingNow";
import useSearchBarSimple from "../api/useSearchBarSimple";
import useSearchBarComplex from "../api/useSearchBarComplex";
import usePagination from "../hooks/usePagination";
import useSelectors from "../redux/useSelectors";
import {setComplexSearch} from "../redux/queriesSlice";
import NavBar from "../components/NavBar";
import SearchBarSimple from "../components/SearchBarSimple";
import SearchBarComplex from "../components/SearchBarComplex";
import MovieCard from "../components/MovieCard";

const AllMoviesPage = () => {
	const [searched, setSearched] = useState(false);

	const {isLoadingPlaying, errorPlaying, setPaginationIndex} = useGetPlayingNow();
	const {isLoadingSearchSimple, errorSearchSimple} = useSearchBarSimple();
	const {isLoadingSearchComplex, errorSearchComplex} = useSearchBarComplex();
	const {movies, data, complexSearch} = useSelectors();
	const {paginate} = usePagination();

	const dispatch = useDispatch();

	//up button
	//clear search
	//complex pagination
	//no cast found error
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
		setSearched(false);

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
			) : errorPlaying || errorSearchSimple || errorSearchComplex ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					There are problems with our servers, please try again later.
				</Text>
			) : (
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
					{movies.length < data.length && (
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
			)}
		</Box>
	);
};

export default AllMoviesPage;
