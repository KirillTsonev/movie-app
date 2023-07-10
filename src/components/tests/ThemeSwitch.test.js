import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderWithProviders} from "../../testUtils";

import ThemeSwitch from "../ThemeSwitch";

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
