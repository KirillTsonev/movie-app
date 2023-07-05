import React from "react";
import {Box} from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const AllMoviesPage = () => {
	return (
		<Box
			w="1140px"
			my="0"
			mx="auto"
		>
			<NavBar />
			<SearchBar />
			<Box
				display="grid"
				gridTemplate="380px / repeat(5, 220px)"
				justifyContent="space-between"
				gridAutoRows="380px"
				rowGap="10px"
				mt="20px"
			>
				<Box bg="red">1</Box>
				<Box bg="red">2</Box>
				<Box bg="red">3</Box>
				<Box bg="red">4</Box>
				<Box bg="red">5</Box>
				<Box bg="red">3</Box>
				<Box bg="red">4</Box>
				<Box bg="red">5</Box>
			</Box>
		</Box>
	);
};

export default AllMoviesPage;
