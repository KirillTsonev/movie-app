import React from "react";
import {Box, Text, Image, Button} from "@chakra-ui/react";

const MovieCard = ({movie}) => {
	return (
		<Box
			bg="gray"
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			<Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
			<Text
				textAlign="center"
				h="50px"
			>
				{movie.original_title}
			</Text>
			<Button
				w="70%"
				bg="#00c0f7"
				transition="all .4s"
				_hover={{
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
				mt="10px"
			>
				Add to Favorites
			</Button>
			<Button
				w="70%"
				bg="#00c0f7"
				transition="all .4s"
				_hover={{
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
				mt="10px"
			>
				Add to Watchlist
			</Button>
			<Button
				bg="#00c0f7"
				transition="all .4s"
				_hover={{
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
				mt="10px"
			>
				Details
			</Button>
		</Box>
	);
};

export default MovieCard;
