import React from "react";
import {Box, Button} from "@chakra-ui/react";
import {useDispatch} from "react-redux";

import useClearData from "../hooks/useClearData";
import useSelectors from "../redux/useSelectors";

import SearchBarComplex from "./SearchBarComplex";
import SearchBarSimple from "./SearchBarSimple";

import {setComplexSearch} from "../redux/settingsSlice";

const SearchBars = ({isFetchingPlaying, isFetchingSearchComplex, isFetchingSearchSimple, refetchPlaying}) => {
	const dispatch = useDispatch();

	const {complexSearch, searched} = useSelectors();
	const {clearData} = useClearData();

	return (
		<Box
			display="flex"
			w="100%"
			position="relative"
		>
			<SearchBarComplex
				isFetchingSearchComplex={isFetchingSearchComplex}
				isFetchingPlaying={isFetchingPlaying}
			/>
			<SearchBarSimple
				isFetchingSearchSimple={isFetchingSearchSimple}
				isFetchingPlaying={isFetchingPlaying}
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
				onClick={() => clearData("all", refetchPlaying)}
			>
				Clear Search
			</Button>
		</Box>
	);
};

export default SearchBars;
