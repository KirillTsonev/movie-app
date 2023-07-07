import React from "react";
import {Input, Button, Box} from "@chakra-ui/react";
import {useDispatch} from "react-redux";

import useSearchBarSimple from "../api/useSearchBarSimple";

import {setResults, resetPagination} from "../redux/homeSlice";
import {setTitle} from "../redux/queriesSlice";

const SearchBarSimple = ({complexSearch}) => {
	const {refetchSearchSimple, searchString, setSearchString} = useSearchBarSimple();
	const dispatch = useDispatch();

	function handleInput(e) {
		setSearchString(e.target.value);

		dispatch(setTitle(e.target.value));
	}

	function handleSearch(e) {
		e.preventDefault();

		if (searchString) {
			dispatch(resetPagination());
			dispatch(setResults("simple"));

			refetchSearchSimple();
		}
	}

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
