import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {SpinnerDotted} from "spinners-react";
import {ErrorBoundary} from "react-error-boundary";

import useSelectors from "../redux/useSelectors";
import usePagination from "../hooks/usePagination";
import useFetchCollections from "../api/statefulLogicHooks/useCollectionsLogic";
import NavBar from "../components/NavBar";
import UpButton from "../components/UpButton";
import CollectionsFilters from "../components/CollectionsFilters";
import CollectionsMoviesDisplay from "../components/CollectionsMoviesDisplay";

const CollectionsPage = () => {
	const {movies} = useSelectors();
	const {paginate} = usePagination();
	const {
		errorCollections,
		isFetchingCollections,
		setCurrentCollection,
		currentCollection,
		refetchCollections,
		isSuccessCollections,
	} = useFetchCollections();

	return (
		<ErrorBoundary
			fallback={
				<Text
					textAlign="center"
					fontSize="35px"
					pt="150px"
				>
					Oops, something went wrong!
				</Text>
			}
		>
			<Box
				w="1140px"
				my="0"
				mx="auto"
			>
				<NavBar />
				<CollectionsFilters
					setCurrentCollection={setCurrentCollection}
					currentCollection={currentCollection}
					refetchCollections={refetchCollections}
				/>
				{isFetchingCollections && movies.length === 0 ? (
					<Box
						display="flex"
						justifyContent="center"
						pt="20px"
					>
						<SpinnerDotted size={"35%"} />
					</Box>
				) : errorCollections ? (
					<Text
						textAlign="center"
						fontSize="25px"
						py="20px"
					>
						There is a problem with our servers, please try again later!
					</Text>
				) : movies.length > 0 ? (
					<CollectionsMoviesDisplay
						paginate={paginate}
						isFetchingCollections={isFetchingCollections}
					/>
				) : movies.length === 0 && isSuccessCollections ? (
					<Text
						textAlign="center"
						fontSize="25px"
						py="20px"
					>
						You don't have any movies in this collection yet, try adding some!
					</Text>
				) : null}
				<UpButton />
			</Box>
		</ErrorBoundary>
	);
};

export default CollectionsPage;
