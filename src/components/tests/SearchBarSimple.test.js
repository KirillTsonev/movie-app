import userEvent from "@testing-library/user-event";
import {screen} from "@testing-library/react";

import SearchBarSimple from "../SearchBarSimple";
import {renderWithProviders} from "../../testUtils";

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
