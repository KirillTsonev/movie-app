import React, {useEffect} from "react";
import {Box, Text, Image, Button, ScaleFade, useDisclosure} from "@chakra-ui/react";

import useSelectors from "../redux/useSelectors";
import useHandleCollection from "../api/useHandleCollection";

import img404Thumbnail from "../assets/img404Thumbnail.jpg";

const MovieCard = ({movie, index}) => {
	const {favorite, watchlist} = useSelectors();
	const {isOpen, onOpen} = useDisclosure();
	const {handleCollectionFavorite, handleCollectionWatchlist} = useHandleCollection();

	useEffect(() => {
		onOpen();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ScaleFade
			in={isOpen}
			initialScale={0.7}
			style={
				index < 10
					? {transition: `all ${0.3 + index * 0.1}s`}
					: {transition: `all ${0.3 + (index - `${index.toString()[0]}0`) * 0.1}s`}
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
					w="200px"
				>
					<Button
						w="93px"
						variant={favorite.includes(movie.id) ? "delete" : "solid"}
						onClick={() => handleCollectionFavorite(movie.id)}
					>
						{favorite.includes(movie.id) ? "- Favorites" : "+ Favorites"}
					</Button>
					<Button
						w="93px"
						variant={watchlist.includes(movie.id) ? "delete" : "solid"}
						onClick={() => handleCollectionWatchlist(movie.id)}
					>
						{watchlist.includes(movie.id) ? "- Watchlsit" : "+ Watchlsit"}
					</Button>
				</Box>
				<Button mt="10px">Details</Button>
			</Box>
		</ScaleFade>
	);
};

export default MovieCard;
