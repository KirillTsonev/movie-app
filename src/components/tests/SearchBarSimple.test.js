import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderWithProviders} from "../../testUtils";

import SearchBarSimple from "../SearchBarSimple";

describe("<SearchBarSimple/>", () => {
	test("renders the search bar", () => {
		renderWithProviders(<SearchBarSimple />);

		expect(screen.getByPlaceholderText("by title", {exact: false})).toBeInTheDocument();
	});

	test("resets on submit", async () => {
		const user = userEvent.setup();

		renderWithProviders(<SearchBarSimple />);

		await user.type(screen.getByPlaceholderText("by title", {exact: false}), "query");
		await user.click(screen.getByText("Search"));

		expect(screen.getByPlaceholderText("by title", {exact: false})).toHaveValue("");
	});
});
