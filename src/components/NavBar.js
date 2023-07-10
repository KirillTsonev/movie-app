import React from "react";
import {NavLink} from "react-router-dom";
import {Box, Button} from "@chakra-ui/react";

import ThemeSwitch from "./ThemeSwitch";

import useFetchLists from "../api/useFetchLists";

const NavBar = () => {
	useFetchLists();

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
		>
			<Button
				as={NavLink}
				to="/"
				w="40%"
				_activeLink={{
					fontWeight: "bold",
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
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
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
			>
				Your collections
			</Button>
			<ThemeSwitch />
		</Box>
	);
};

export default NavBar;
