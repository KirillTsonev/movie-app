import userEvent from "@testing-library/user-event";
import {screen} from "@testing-library/react";

import ThemeSwitch from "../ThemeSwitch";
import {renderWithProviders} from "../../testUtils";

describe("<ThemeSwitch/>", () => {
	test("renders the switch", () => {
		renderWithProviders(<ThemeSwitch />);

		expect(screen.getByText("Toggle 🌜")).toBeInTheDocument();
	});

	test("toggles on click", async () => {
		const user = userEvent.setup();

		renderWithProviders(<ThemeSwitch />);

		await user.click(screen.getByText("Toggle 🌜"));

		expect(screen.getByText("Toggle 🌞")).toBeInTheDocument();
	});
});
