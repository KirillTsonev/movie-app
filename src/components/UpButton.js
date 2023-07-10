import React, {useEffect, useState} from "react";
import {Image, Fade} from "@chakra-ui/react";

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

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<Fade
			in={showButton}
			data-testid="upTest"
		>
			<Image
				src={upButton}
				position="fixed"
				top="90%"
				left="95%"
				cursor="pointer"
				h="50px"
				onClick={scrollToTop}
			/>
		</Fade>
	);
};

export default UpButton;
