import React from "react";
import {Box, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import error404bg from "../assets/error404.jpg";

const Error404Page = () => {
	return (
		<Box
			backgroundImage={error404bg}
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			w="100%"
			h="100vh"
		>
			<Heading
				pt="250px"
				color="white"
				textAlign="center"
			>
				Oops, there's no one here!
			</Heading>
			<Text
				mt="20px"
				color="white"
				textAlign="center"
				fontSize="25px"
			>
				Click{" "}
				<Text
					as={Link}
					to="/"
					color="teal"
				>
					here
				</Text>{" "}
				to go to the home page!
			</Text>
		</Box>
	);
};

export default Error404Page;
