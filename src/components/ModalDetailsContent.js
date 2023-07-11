import React from "react";
import {Box, Text, Image} from "@chakra-ui/react";

import img404Poster from "../assets/img404Poster.jpg";

const ModalDetailsContent = ({details}) => {
	return (
		<Box
			display="flex"
			gap="40px"
		>
			<Image
				h="500px"
				src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
				fallbackSrc={img404Poster}
			></Image>
			<Box>
				<Box
					display="flex"
					alignItems="center"
				>
					<Text
						fontSize="20"
						fontWeight="bold"
					>
						Overview:
					</Text>
					<Text ml="auto">{`Release date: ${details.release_date}`}</Text>
				</Box>
				<Text
					mt="15px"
					fontSize="18px"
				>
					{details.overview}
				</Text>
				<Text
					mt="20px"
					fontSize="20"
					fontWeight="bold"
				>
					Genres:
				</Text>
				<Box
					display="flex"
					flexWrap="wrap"
					w="100%"
					mt="10px"
				>
					{details &&
						details.genres.map((a, i) => (
							<Box
								w="150px"
								textAlign="center"
								key={i}
								borderRadius="10px"
								lineHeight="35px"
								ml="20px"
								mb="20px"
								fontSize="18px"
								border="3px solid white"
								fontWeight="bold"
							>
								{a.name}
							</Box>
						))}
				</Box>
				<Text
					fontSize="20px"
					mt="20px"
					fontWeight="bold"
				>{`Rating is ${(details.vote_average / 2).toFixed(1)}★ as per ${details.vote_count} users!`}</Text>
			</Box>
		</Box>
	);
};

export default ModalDetailsContent;
