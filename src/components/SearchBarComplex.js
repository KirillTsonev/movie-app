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

import useGenresQuery from "../api/reactQueryHooks/useGenresQuery";
import useCheckBoxes from "../hooks/useCheckBoxes";
import useSearchBarComplex from "../api/statefulLogicHooks/useSearchComplexLogic";
import useSelectors from "../redux/useSelectors";
import useHandleComplexSearch from "../hooks/useHandleComplexSearch";

const SearchBarComplex = ({isFetchingPlaying, isFetchingSearchComplex}) => {
	const {dataGenres} = useGenresQuery();
	const {castState, yearState, setCastState, setYearState} = useSearchBarComplex();
	const {selectedGenres, checks, handleCheckGenre, setChecks, setSelectedGenres} = useCheckBoxes();
	const {onOpen} = useDisclosure();
	const {complexSearch} = useSelectors();
	const {handleSearch} = useHandleComplexSearch({setSelectedGenres, setChecks, checks});

	return (
		<Box
			display={complexSearch ? "flex" : "none"}
			w="85%"
			as="form"
			onSubmit={(e) => handleSearch({e, selectedGenres, castState, yearState, setCastState, setYearState})}
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
								<Box data-testid="checksId">
									{dataGenres &&
										dataGenres.genres.map((a, i) => (
											<Checkbox
												key={a.id}
												value={a.id}
												name={a.name}
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
				style={isFetchingSearchComplex && isFetchingPlaying ? {pointerEvents: "none"} : null}
			>
				Search
			</Button>
		</Box>
	);
};

export default SearchBarComplex;
