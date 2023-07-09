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
		delete: {
			background: "red",
			_hover: {
				background: "#d64000",
				transform: "translateX(5px) translateY(-5px)",
				boxShadow:
					"-1px 1px 1px #932c00, -2px 2px 1px #932c00, -3px 3px 1px #932c00, -4px 4px 1px #932c00, -5px 5px 1px #932c00",
			},
			_active: {
				background: "#eb286a",
			},
		},
	},
});

const theme = extendTheme({
	components: {
		Button,
	},
});

export default theme;
