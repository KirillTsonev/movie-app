import {useColorMode, Button} from "@chakra-ui/react";

const ThemeSwitch = () => {
	const {colorMode, toggleColorMode} = useColorMode();

	return (
		<Button
			bg="#00c0f7"
			onClick={toggleColorMode}
			transition="background transform .4s"
			_hover={{
				background: "#17b824",
				transform: "translateX(5px) translateY(-5px)",
				boxShadow:
					"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
			}}
		>
			Toggle {colorMode === "light" ? "🌜" : "🌞"}
		</Button>
	);
};

export default ThemeSwitch;
