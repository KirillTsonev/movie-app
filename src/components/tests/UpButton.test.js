import {screen} from "@testing-library/react";

import {renderWithProviders} from "../../testUtils";

import AllMoviesPage from "../../pages/AllMoviesPage";

describe("<ComplexBarSimple/>", () => {
	test("renders the button but it's hidden", async () => {
		renderWithProviders(<AllMoviesPage />);

		expect(screen.getByTestId("upTest")).toHaveStyle("opacity: 0");
	});
});
