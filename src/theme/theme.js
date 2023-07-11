import {extendTheme, defineStyleConfig} from "@chakra-ui/react";

const Button = defineStyleConfig({
	variants: {
		solid: {
			background: "#00c0f7",
			transition: "background transform .4s",
			_hover: {
				background: "#17b824",
				transform: "translateX(5px) translateY(-5px)",
				boxShadow:
					"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
			},
			_active: {
				background: "#6deb28",
			},
		},
	},
});

const Background = defineStyleConfig({
	baseStyle: {
		_after: {
			content: '""',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			position: "absolute",
			zIndex: -1,
			height: "100%",
			width: "100%",
		},
	},
	variants: {
		backgroundImg: {
			_after: {
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			},
		},
		backgroundColor: {
			_after: {
				opacity: ".8",
				filter: "brightness(.3)",
			},
		},
	},
});

const theme = extendTheme({
	components: {
		Button,
		Background,
	},
});

export default theme;
