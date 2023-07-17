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
	Text,
	Box,
	useStyleConfig,
} from "@chakra-ui/react";
import {SpinnerRoundOutlined} from "spinners-react";

import ModalDetailsContent from "./ModalDetailsContent";
import useDetailsLogic from "../api/statefulLogicHooks/useDetailsLogic";
import useSelectors from "../redux/useSelectors";

const Background = ({variant, ...rest}) => {
	const styles = useStyleConfig("Background", {variant});

	return <Box __css={{...styles._after, ...rest._after}} />;
};

const ModalDetails = ({id}) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {setId, isFetchingDetails} = useDetailsLogic();
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
					Details
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
						<Background
							variant="backgroundImg"
							_after={{
								backgroundImage: `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`,
							}}
						/>
						<Background
							variant="backgroundColor"
							_after={{
								background: `#${Math.random().toString(16).slice(-6)}`,
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
							<ModalDetailsContent details={details} />
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
