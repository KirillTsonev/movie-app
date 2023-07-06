import React, {useContext} from "react";
import {Box, Input, Button, NumberInput, NumberInputField, Checkbox} from "@chakra-ui/react";

import useSearchBarComplex from "../api/useSearchBarComplex";
import useFetchGenres from "../api/useFetchGenres";
import useCheckBoxes from "../api/useCheckBoxes";

import {MoviesContext} from "../context/moviesContext";

const SearchBarComplex = ({setSearched}) => {
	const {year, setYear, cast, setCast, refetchSearchComplex, setSelectedGenresApi} = useSearchBarComplex();

	const {setResults} = useContext(MoviesContext);
	const {dataGenres} = useFetchGenres();
	const {showGenres, setShowGenres, handleCheckGenre, handleGenres} = useCheckBoxes(setSelectedGenresApi);

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
				<Box
					width="30%"
					position="relative"
				>
					<Button
						variant="ghost"
						w="100%"
						onClick={() => setShowGenres(!showGenres)}
					>
						Choose genres
					</Button>
					<Box
						w="500px"
						textAlign="center"
						position="absolute"
						border="2px solid"
						borderRadius="10px"
						color="var(--chakra-colors-chakra-body-text)"
						bg="var(--chakra-colors-chakra-body-bg)"
						px="10px"
						display={showGenres ? "block" : "none"}
						top="50px"
					>
						<Box>
							{dataGenres &&
								dataGenres.genres.map((a) => (
									<Checkbox
										key={a.id}
										value={a.id}
										mr="10px"
										mt="10px"
										colorScheme="green"
										onChange={(e) => handleCheckGenre(e)}
									>
										{a.name}
									</Checkbox>
								))}
						</Box>
						<Button
							m="10px"
							ml="auto"
							display="block"
							bg="#00c0f7"
							_hover={{
								background: "#17b824",
								transform: "translateX(5px) translateY(-5px)",
								boxShadow:
									"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
							}}
							onClick={handleGenres}
						>
							Save genres
						</Button>
					</Box>
				</Box>
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
