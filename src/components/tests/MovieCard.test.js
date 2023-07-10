import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderWithProviders} from "../../testUtils";

import AllMoviesPage from "../../pages/AllMoviesPage";

describe("<MovieCard/>", () => {
	test("renders the 3 inputs", async () => {
		const user = userEvent.setup();

		renderWithProviders(<AllMoviesPage />);

		await user.click(screen.getByText("Complex", {exact: false}));

		expect(screen.getByPlaceholderText("by cast", {exact: false})).toBeInTheDocument();
		expect(screen.getByPlaceholderText("release year", {exact: false})).toBeInTheDocument();
		expect(screen.getByRole("button", {name: /choose genres/i})).toBeInTheDocument();
	});
});
