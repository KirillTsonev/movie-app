import React from "react";
import {Input, Button, Box} from "@chakra-ui/react";

import useSearchBarSimple from "../api/statefulLogicHooks/useSearchSimpleLogic";
import useHandleSimpleSearch from "../hooks/useHandleSimpleSearch";
import useSelectors from "../redux/useSelectors";

const SearchBarSimple = ({isFetchingSearchSimple, isFetchingPlaying}) => {
	const {titleState, setTitleState} = useSearchBarSimple();
	const {handleSearch} = useHandleSimpleSearch();
	const {complexSearch} = useSelectors();

	return (
		<Box
			display={complexSearch ? "none" : "flex"}
			w="85%"
			as="form"
			onSubmit={(e) => handleSearch({e, titleState, setTitleState})}
		>
			<Input
				placeholder="Search movies by title"
				_placeholder={{opacity: 1, color: "gray.500"}}
				name="title"
				border="2px solid #00c0f7"
				value={titleState}
				onChange={(e) => setTitleState(e.target.value)}
			/>
			<Button
				ml="20px"
				type="submit"
				style={isFetchingSearchSimple && isFetchingPlaying ? {pointerEvents: "none"} : null}
			>
				Search
			</Button>
		</Box>
	);
};

export default SearchBarSimple;
