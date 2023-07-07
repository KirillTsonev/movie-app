import React from "react";
import {Box, Input, Button, NumberInput, NumberInputField, Checkbox} from "@chakra-ui/react";
import {useDispatch} from "react-redux";

import useSearchBarComplex from "../api/useSearchBarComplex";
import useFetchGenres from "../api/useFetchGenres";
import useCheckBoxes from "../hooks/useCheckBoxes";

import {setResults, resetPagination} from "../redux/homeSlice";
import {setCastStore, setGenresStore, setYearStore} from "../redux/queriesSlice";

const SearchBarComplex = ({complexSearch}) => {
	const {yearState, setYearState, castState, setCastState, refetchSearchComplex, setGenresState} =
		useSearchBarComplex();
	const {dataGenres} = useFetchGenres();
	const {showGenres, setShowGenres, handleCheckGenre, handleGenres, selectedGenres, checks, setChecks} =
		useCheckBoxes(setGenresState);
	const dispatch = useDispatch();

	function handleSearch(e) {
		e.preventDefault();

		if (!!yearState || !!castState || !!selectedGenres) {
			dispatch(setResults("complex"));
			dispatch(resetPagination());

			refetchSearchComplex();

			setChecks(checks.map((a) => (a = false)));
		}
	}

	function handleInput(e, setState, setStore) {
		setState(e.target.value);

		dispatch(setStore(e.target.value));
	}

	return (
		<Box
			display={complexSearch ? "flex" : "none"}
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
						variant="outline"
						w="100%"
						onClick={() => setShowGenres(!showGenres)}
						border="2px solid #00c0f7"
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
								dataGenres.genres.map((a, i) => (
									<Checkbox
										key={a.id}
										value={a.id}
										id={a.id}
										mr="10px"
										mt="10px"
										colorScheme="green"
										isChecked={checks[i]}
										onChange={(e) => handleCheckGenre(e, i)}
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
					value={castState}
					onChange={(e) => handleInput(e, setCastState, setCastStore)}
					border="2px solid #00c0f7"
				/>
				<NumberInput
					w="21%"
					value={yearState}
				>
					<NumberInputField
						name="year"
						px="10px"
						placeholder="Search by release year"
						_placeholder={{opacity: 1, color: "gray.500"}}
						border="2px solid #00c0f7"
						onChange={(e) => handleInput(e, setYearState, setYearStore)}
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
