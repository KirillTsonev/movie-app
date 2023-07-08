import React from "react";
import {Input, Button, Box} from "@chakra-ui/react";

import useSearchBarSimple from "../api/useSearchBarSimple";
import useHandleSimpleSearch from "../hooks/useHandleSimpleSearch";
import useSelectors from "../redux/useSelectors";

const SearchBarSimple = () => {
	const {searchString} = useSearchBarSimple();
	const {handleInput, handleSearch} = useHandleSimpleSearch();
	const {complexSearch} = useSelectors();

	return (
		<Box
			display={complexSearch ? "none" : "flex"}
			w="85%"
			as="form"
			onSubmit={(e) => handleSearch(e)}
		>
			<Input
				placeholder="Search movies by title"
				_placeholder={{opacity: 1, color: "gray.500"}}
				name="title"
				border="2px solid #00c0f7"
				value={searchString}
				onChange={(e) => handleInput(e)}
			/>
			<Button
				ml="20px"
				type="submit"
			>
				Search
			</Button>
		</Box>
	);
};

export default SearchBarSimple;
