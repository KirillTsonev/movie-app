import React, {useState} from "react";
import {Input, Button, Box} from "@chakra-ui/react";

import {apiAuthorization} from "../constants";

const SearchBar = ({setMovies}) => {
	const [searchString, setSearchString] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1`,
			options
		);
		const results = await response.json();

		console.log(results.results);

		setMovies(results.results);

		setSearchString("");
	}

	return (
		<Box
			display="flex"
			as="form"
			onSubmit={(e) => handleSubmit(e)}
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

export default SearchBar;
