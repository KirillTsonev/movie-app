import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderWithProviders} from "../../testUtils";

import AllMoviesPage from "../../pages/AllMoviesPage";

describe("<ComplexBarSimple/>", () => {
	test("renders the 3 inputs", async () => {
		const user = userEvent.setup();

		renderWithProviders(<AllMoviesPage />);

		await user.click(screen.getByText("Complex", {exact: false}));

		expect(screen.getByPlaceholderText("by cast", {exact: false})).toBeInTheDocument();
		expect(screen.getByPlaceholderText("release year", {exact: false})).toBeInTheDocument();
		expect(screen.getByRole("button", {name: /choose genres/i})).toBeInTheDocument();
	});

	test("inputs reset after search submit", async () => {
		const user = userEvent.setup();

		renderWithProviders(<AllMoviesPage />);

		await user.click(screen.getByText("Complex", {exact: false}));

		await user.type(screen.getByPlaceholderText("by cast", {exact: false}), "query");
		await user.type(screen.getByPlaceholderText("by release", {exact: false}), "2015");
		await user.click(screen.getByText("Choose genres"));
		await user.click(screen.getByText("Action"));

		await user.click(screen.getAllByText("Search")[0]);

		expect(screen.getByPlaceholderText("by cast", {exact: false})).toHaveValue("");
		expect(screen.getByPlaceholderText("by release", {exact: false})).toHaveValue("");
		expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
	});
});
