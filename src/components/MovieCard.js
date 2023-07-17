import React, {useEffect} from "react";
import {
	Box,
	Text,
	Image,
	Button,
	ScaleFade,
	useDisclosure,
	Popover,
	PopoverArrow,
	PopoverTrigger,
	PopoverBody,
	PopoverContent,
	Tooltip,
} from "@chakra-ui/react";

import img404Thumbnail from "../assets/img404Thumbnail.jpg";
import ModalDetails from "./ModalDetails";
import StarRating from "./StarRating";
import FavoriteSvg from "./svg/FavoriteSvg";
import RateSvg from "./svg/RateSvg";
import WatchlistSvg from "./svg/WatchlistSvg";

const MovieCard = ({movie, index}) => {
	const {isOpen, onOpen} = useDisclosure();

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
				h="330px"
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
					h="65px"
					py="5px"
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
					mb="20px"
					w="200px"
				>
					<FavoriteSvg id={movie.id} />
					<WatchlistSvg id={movie.id} />
					<Popover>
						{/* I tried using the chakra forwardRef to turn the RateSvg into a button but encountered weird behavior with the animation */}
						<PopoverTrigger>
							<Tooltip
								hasArrow
								label="Rate movie"
							>
								<Button
									w="60px"
									h="60px"
									borderRadius="100%"
									p="0"
									m="0"
									variant="link"
								>
									<RateSvg id={movie.id} />
								</Button>
							</Tooltip>
						</PopoverTrigger>
						<PopoverContent w="270px">
							<PopoverArrow />
							<PopoverBody>
								<StarRating id={movie.id} />
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Box>
				<ModalDetails id={movie.id} />
			</Box>
		</ScaleFade>
	);
};

export default MovieCard;
