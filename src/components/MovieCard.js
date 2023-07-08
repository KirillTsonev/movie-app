import React, {useEffect} from "react";
import {Box, Text, Image, Button, ScaleFade, useDisclosure} from "@chakra-ui/react";

import useHandleCollection from "../api/useHandleCollection";
import useSelectors from "../redux/useSelectors";

import img404Thumbnail from "../assets/img404Thumbnail.jpg";

const MovieCard = ({movie, index}) => {
	const {addToCollection} = useHandleCollection();
	const {favorites} = useSelectors();

	useEffect(() => {
		onOpen();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {isOpen, onOpen} = useDisclosure();

	return (
		<ScaleFade
			in={isOpen}
			initialScale={0.7}
			style={
				index < 10
					? {transition: `all ${0.3 + index * 0.1}s`}
					: index > 9 && index < 20
					? {transition: `all ${0.3 + (index - 10) * 0.1}s`}
					: index > 19 && index < 30
					? {transition: `all ${0.3 + (index - 20) * 0.1}s`}
					: index > 29 && index < 40
					? {transition: `all ${0.3 + (index - 30) * 0.1}s`}
					: index > 39 && index < 50
					? {transition: `all ${0.3 + (index - 40) * 0.1}s`}
					: index > 49 && index < 60
					? {transition: `all ${0.3 + (index - 50) * 0.1}s`}
					: index > 59 && index < 70
					? {transition: `all ${0.3 + (index - 60) * 0.1}s`}
					: index > 69 && index < 80
					? {transition: `all ${0.3 + (index - 70) * 0.1}s`}
					: index > 79 && index < 90
					? {transition: `all ${0.3 + (index - 80) * 0.1}s`}
					: {transition: `all ${0.3 + (index - 90) * 0.1}s`}
			}
		>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				border="2px solid"
				borderRadius="12px"
				h="380px"
			>
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
					w="100%"
					h="125px"
					borderTopRightRadius="10px"
					borderTopLeftRadius="10px"
					borderBottom="2px solid"
					fallbackSrc={img404Thumbnail}
				/>
				<Box
					display="flex"
					h="80px"
					px="5px"
					alignItems="center"
				>
					<Text
						textAlign="center"
						fontWeight="700"
					>
						{movie.original_title.length < 40 ? movie.original_title : movie.original_title.slice(0, 40) + "..."}
					</Text>
				</Box>
				<Box
					display="flex"
					justifyContent="space-around"
					mt="10px"
				>
					<Button
						w="40%"
						variant={favorites.includes(movie.id) ? "delete" : "solid"}
						onClick={
							favorites.includes(movie.id)
								? () => addToCollection.mutate({id: movie.id, key: "favorite", bool: false})
								: () => addToCollection.mutate({id: movie.id, key: "favorite", bool: true})
						}
					>
						Favorites
					</Button>
					<Button
						w="40%"
						onClick={() => addToCollection.mutate({id: movie.id, key: "watchlist"})}
					>
						Watchlist
					</Button>
				</Box>
				<Button mt="10px">Details</Button>
			</Box>
		</ScaleFade>
	);
};

export default MovieCard;
