import React, {useEffect, useState} from "react";
import {Image, Fade, Link} from "@chakra-ui/react";

import upButton from "../assets/arrow.png";

const UpButton = () => {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (document.documentElement.scrollTop > 1000) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<Fade in={showButton}>
			<Link href="#top">
				<Image
					src={upButton}
					position="fixed"
					top="90%"
					left="95%"
					cursor="pointer"
					h="50px"
				/>
			</Link>
		</Fade>
	);
};

export default UpButton;
