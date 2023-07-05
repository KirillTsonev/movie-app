import React from "react";
import {Box, Text, Image, Button} from "@chakra-ui/react";

const MovieCard = ({movie}) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			border="2px solid"
			borderRadius="12px"
		>
			<Image
				src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
				w="100%"
				borderTopRightRadius="10px"
				borderTopLeftRadius="10px"
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
					bg="#00c0f7"
					transition="all .4s"
					_hover={{
						background: "#17b824",
						transform: "translateX(5px) translateY(-5px)",
						boxShadow:
							"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
					}}
				>
					Favorites
				</Button>
				<Button
					w="40%"
					bg="#00c0f7"
					transition="all .4s"
					_hover={{
						background: "#17b824",
						transform: "translateX(5px) translateY(-5px)",
						boxShadow:
							"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
					}}
				>
					Watchlist
				</Button>
			</Box>
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
