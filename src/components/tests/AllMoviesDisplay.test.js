import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderWithProviders} from "../../testUtils";

import AllMoviesPage from "../../pages/AllMoviesPage";

describe("<AllMoviesDisplay/>", () => {
	test("renders 10 movies", async () => {
		renderWithProviders(<AllMoviesPage />);

		expect(await screen.findAllByText("Details")).toHaveLength(10);
	});

	test("paginates on button press", async () => {
		const user = userEvent.setup();

		renderWithProviders(<AllMoviesPage />);

		expect(await screen.findAllByText("Details")).toHaveLength(10);

		await user.click(screen.getByText("Load more movies"));

		expect(await screen.findAllByText("Details")).toHaveLength(20);
	});
});
