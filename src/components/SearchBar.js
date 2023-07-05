import React from "react";

import {Input, Button, Box} from "@chakra-ui/react";
import {Form} from "react-router-dom";

const SearchBar = () => {
	return (
		<Form
			method="get"
			action="/"
		>
			<Box display="flex">
				<Input
					placeholder="Search movies"
					name="search"
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
		</Form>
	);
};

export default SearchBar;
