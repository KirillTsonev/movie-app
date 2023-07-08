import React from "react";
import {
	Box,
	Input,
	Button,
	NumberInput,
	NumberInputField,
	Checkbox,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	PopoverArrow,
	useDisclosure,
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";

import useFetchGenres from "../api/useFetchGenres";
import useCheckBoxes from "../hooks/useCheckBoxes";
import useSearchBarComplex from "../api/useSearchBarComplex";
import {setComplexQueries, resetQueries} from "../redux/queriesSlice";
import {resetHomeState} from "../redux/homeSlice";

const SearchBarComplex = ({complexSearch, setSearched}) => {
	const {dataGenres} = useFetchGenres();
	const {castState, yearState, setCastState, setYearState, refetchSearchComplex} = useSearchBarComplex();
	const {selectedGenres, setSelectedGenres, setChecks, checks, handleCheckGenre} = useCheckBoxes();
	const {onOpen} = useDisclosure();

	const dispatch = useDispatch();

	async function handleSearch(e) {
		e.preventDefault();

		if ((yearState >= 1700 && yearState <= 2023) || !!castState || selectedGenres.length > 0) {
			await dispatch(resetQueries());
			await dispatch(resetHomeState());
			await dispatch(setComplexQueries({selectedGenres, castState, yearState}));

			setSearched(true);

			refetchSearchComplex();

			setSelectedGenres([]);
			setChecks(checks.map(() => false));
		}
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
					<Popover>
						<PopoverTrigger>
							<Button
								variant="outline"
								w="100%"
								onClick={onOpen}
								border="2px solid #00c0f7"
								bg={selectedGenres.length > 0 && "#17b824"}
							>
								Choose genres
							</Button>
						</PopoverTrigger>
						<PopoverContent
							w="500px"
							pb="10px"
							textAlign="center"
						>
							<PopoverArrow />
							<PopoverBody>
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
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Box>
				<Input
					placeholder="Search by cast, comma separated"
					_placeholder={{opacity: 1, color: "gray.500"}}
					name="cast"
					w="30%"
					px="10px"
					value={castState}
					onChange={(e) => setCastState(e.target.value)}
					border="2px solid #00c0f7"
				/>
				<NumberInput
					w="21%"
					value={yearState}
					min="1700"
					max="2023"
					isValidCharacter={(character) => character.match(/^[0-9]$/)}
				>
					<NumberInputField
						name="year"
						px="10px"
						placeholder="Search by release year"
						_placeholder={{opacity: 1, color: "gray.500"}}
						border="2px solid #00c0f7"
						onChange={(e) => setYearState(e.target.value)}
					/>
				</NumberInput>
			</Box>
			<Button
				ml="20px"
				type="submit"
			>
				Search
			</Button>
		</Box>
	);
};

export default SearchBarComplex;
