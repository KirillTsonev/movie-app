import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderWithProviders} from "../../testUtils";

import AllMoviesPage from "../../pages/AllMoviesPage";

describe("<MovieCard/>", () => {
	test("renders modal window with details on button click", async () => {
		const user = userEvent.setup();

		renderWithProviders(<AllMoviesPage />);

		const details = await screen.findAllByText("Details");

		await user.click(details[0]);

		expect(await screen.findByText("Release date", {exact: false})).toBeInTheDocument();
	});

	test("changes to favorites collection on icon click", async () => {
		const user = userEvent.setup();

		renderWithProviders(<AllMoviesPage />);

		const favorite = await screen.findAllByTestId("favoriteTest");

		expect(favorite[6]).toHaveStyle("fill: #324A5E");

		await user.click(favorite[6]);
		await user.unhover(favorite[6]);

		expect(favorite[6]).toHaveStyle("fill: #ff6a00");
	});

	test("watchlist button is inactive if movie is rated", async () => {
		renderWithProviders(<AllMoviesPage />);

		const watchlist = await screen.findAllByTestId("watchlistTest");

		expect(watchlist[2]).toHaveStyle("pointer-events: none");
	});
});
