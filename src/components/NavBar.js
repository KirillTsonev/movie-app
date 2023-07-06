import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {Box, Button} from "@chakra-ui/react";

import ThemeSwitch from "./ThemeSwitch";
import {MoviesContext} from "../context/moviesContext";

const NavBar = () => {
	const {setResults} = useContext(MoviesContext);

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
				bg="#00c0f7"
				transition="background transform .4s"
				_hover={{
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
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
				bg="#00c0f7"
				transition="background transform .4s"
				_hover={{
					background: "#17b824",
					transform: "translateX(5px) translateY(-5px)",
					boxShadow:
						"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
				}}
				_activeLink={{
					fontWeight: "bold",
					textTransform: "uppercase",
				}}
				onClick={() => setResults("all")}
			>
				Your collections
			</Button>
			<ThemeSwitch />
		</Box>
	);
};

export default NavBar;
