import React from "react";
import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Image,
	Text,
	Box,
} from "@chakra-ui/react";
import {SpinnerRoundOutlined} from "spinners-react";

import img404Poster from "../assets/img404Poster.jpg";

import useFetchDetails from "../api/useFetchDetails";
import useSelectors from "../redux/useSelectors";

const ModalDetails = ({id}) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {setId, isFetchingDetails} = useFetchDetails();
	const {details} = useSelectors();

	return (
		<>
			{isFetchingDetails ? (
				<SpinnerRoundOutlined
					color="blue"
					size="20%"
				/>
			) : (
				<Button
					onClick={() => {
						setId(id);
						onOpen();
					}}
				>
					"Details"
				</Button>
			)}
			{!isFetchingDetails && (
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					isCentered={true}
					size="5xl"
					onCloseComplete={() => {
						setId(0);
					}}
				>
					<ModalOverlay />
					<ModalContent color="white">
						<Box
							_after={{
								content: '""',
								backgroundImage: `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								position: "absolute",
								zIndex: -1,
								height: "100%",
								width: "100%",
							}}
						/>
						<Box
							_after={{
								content: '""',
								background: `#${Math.floor(Math.random() * 16777200).toString(16)}`,
								opacity: ".8",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								position: "absolute",
								zIndex: -1,
								height: "100%",
								width: "100%",
								filter: "brightness(.3)",
							}}
						/>
						<ModalHeader>
							<Text fontSize="25px">{details.original_title}</Text>
							{details.tagline && (
								<Text
									fontWeight="normal"
									fontSize="18px"
								>
									{`"${details.tagline}"`}
								</Text>
							)}
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
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
													w="120px"
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
									>{`Rating is ${details.vote_average / 2}★ as per ${details.vote_count} users!`}</Text>
								</Box>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={onClose}
							>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default ModalDetails;
