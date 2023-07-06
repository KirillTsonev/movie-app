import React, {useContext} from "react";
import {Box, Input, Button, NumberInput, NumberInputField, Select} from "@chakra-ui/react";

import useSearchBarComplex from "../api/useSearchBarComplex";
import {MoviesContext} from "../context/moviesContext";

const SearchBarComplex = ({setSearched}) => {
	const {year, setYear, cast, setCast, refetchSearchComplex} = useSearchBarComplex();

	const {setResults} = useContext(MoviesContext);

	function handleSearch(e) {
		e.preventDefault();

		setResults("complex");

		setSearched(true);

		refetchSearchComplex();
	}

	return (
		<Box
			display="flex"
			w="85%"
			as="form"
			onSubmit={(e) => handleSearch(e)}
		>
			<Box
				w="100%"
				display="flex"
				justifyContent="space-around"
			>
				{/* <Input
					placeholder="Search by genres, comma separated"
					_placeholder={{opacity: 1, color: "gray.500"}}
					name="genres"
					w="30%"
					px="10px"
					border="2px solid #00c0f7"
					// value={searchString}
					// onChange={(e) => setSearchString(e.target.value)}
				/> */}
				<Select
					placeholder="Select genre"
					name="genres"
					w="30%"
					px="10px"
					border="2px solid #00c0f7"
					variant="filled"
				>
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</Select>
				<Input
					placeholder="Search by cast, comma separated"
					_placeholder={{opacity: 1, color: "gray.500"}}
					name="cast"
					w="30%"
					px="10px"
					value={cast}
					onChange={(e) => setCast(e.target.value)}
					border="2px solid #00c0f7"
				/>
				<NumberInput w="21%">
					<NumberInputField
						name="year"
						px="10px"
						placeholder="Search by release year"
						_placeholder={{opacity: 1, color: "gray.500"}}
						border="2px solid #00c0f7"
						onChange={(e) => setYear(e.target.value)}
						value={year}
					/>
				</NumberInput>
			</Box>
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

export default SearchBarComplex;
