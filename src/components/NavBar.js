import React from "react";
import {NavLink} from "react-router-dom";
import {Box, Button} from "@chakra-ui/react";

import ThemeSwitch from "./ThemeSwitch";

import useGetPlayingNow from "../api/useGetPlayingNow";

const NavBar = () => {
	const {clearSearch} = useGetPlayingNow();

	return (
		<Box
			as="nav"
			display="flex"
			p="30px"
			my="0"
			mx="auto"
			w="1140px"
			alignItems="center"
			justifyContent="space-between"
			id="top"
		>
			<Button
				as={NavLink}
				to="/"
				w="40%"
				_activeLink={{
					fontWeight: "bold",
					textTransform: "uppercase",
				}}
			>
				All movies
			</Button>
			<Button
				as={NavLink}
				to="/collections"
				w="40%"
				_activeLink={{
					fontWeight: "bold",
					textTransform: "uppercase",
				}}
				onClick={clearSearch}
			>
				Your collections
			</Button>
			<ThemeSwitch />
		</Box>
	);
};

export default NavBar;
