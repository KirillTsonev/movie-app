import {useColorMode, Button} from "@chakra-ui/react";

const ThemeSwitch = () => {
	const {colorMode, toggleColorMode} = useColorMode();

	return <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "🌜" : "🌞"}</Button>;
};

export default ThemeSwitch;
