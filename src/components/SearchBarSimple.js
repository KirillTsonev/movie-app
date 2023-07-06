import React from "react";
import {Input, Button, Box} from "@chakra-ui/react";

import useSearchBarSimple from "../api/useSearchBarSimple";

const SearchBarSimple = ({setSearched}) => {
	const {refetchSearch, searchString, setSearchString} = useSearchBarSimple();

	function handleSearch(e) {
		e.preventDefault();

		setSearched(true);

		refetchSearch();
	}

	return (
		<Box
			display="flex"
			w="85%"
			as="form"
			onSubmit={(e) => handleSearch(e)}
		>
			<Input
				placeholder="Search movies"
				name="search"
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
			/>
			<Button
				bg="#00c0f7"
				transition="all .4s"
				ml="20px"
				_hover={{
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
				type="submit"
			>
				Search
			</Button>
		</Box>
	);
};

export default SearchBarSimple;
