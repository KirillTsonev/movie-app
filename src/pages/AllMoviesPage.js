import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";

import useGetPlayingNow from "../api/useGetPlayingNow";
import useSearchBarSimple from "../api/useSearchBarSimple";
import useSearchBarComplex from "../api/useSearchBarComplex";
import usePagination from "../hooks/usePagination";
import useSelectors from "../redux/useSelectors";
import NavBar from "../components/NavBar";
import UpButton from "../components/UpButton";
import AllMoviesDisplay from "../components/AllMoviesDisplay";
import SearchBars from "../components/SearchBars";

const AllMoviesPage = () => {
	const {isFetchingPlaying, errorPlaying, refetchPlaying, isSuccessPlaying} = useGetPlayingNow();
	const {isFetchingSearchSimple, errorSearchSimple} = useSearchBarSimple();
	const {isFetchingSearchComplex, errorSearchComplex} = useSearchBarComplex();
	const {movies} = useSelectors();
	const {paginate} = usePagination();

	return (
		<Box
			w="1140px"
			my="0"
			mx="auto"
		>
			<NavBar />
			<SearchBars
				isFetchingPlaying={isFetchingPlaying}
				isFetchingSearchComplex={isFetchingSearchComplex}
				isFetchingSearchSimple={isFetchingSearchSimple}
				refetchPlaying={refetchPlaying}
			/>
			{/* This condition ensures showing spinner on every new search. The isLoading value provided by React Query only fires off on 
			the very first fetch, hence it's not suitable for this job. If the index is not a part of the condition the spinner appears 
			on every pagination load, even for previous data that has already been fetched */}
			{(isFetchingPlaying || isFetchingSearchSimple || isFetchingSearchComplex) && movies.length === 0 ? (
				<Box
					display="flex"
					justifyContent="center"
					pt="20px"
				>
					<SpinnerDotted size={"35%"} />
				</Box>
			) : errorPlaying || errorSearchSimple || errorSearchComplex ? (
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
				<AllMoviesDisplay
					isFetchingPlaying={isFetchingPlaying}
					isFetchingSearchComplex={isFetchingSearchComplex}
					isFetchingSearchSimple={isFetchingSearchSimple}
					paginate={paginate}
				/>
			) : movies.length === 0 && isSuccessPlaying ? (
				<Text
					textAlign="center"
					fontSize="25px"
					py="20px"
				>
					No movies could be found using your queries, try different ones!
				</Text>
			) : null}
			<UpButton />
		</Box>
	);
};

export default AllMoviesPage;
