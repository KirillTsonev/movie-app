import {screen} from "@testing-library/react";

import AllMoviesPage from "../../pages/AllMoviesPage";
import {renderWithProviders} from "../../testUtils";

describe("<ComplexBarSimple/>", () => {
	test("renders the button but it's hidden", async () => {
		renderWithProviders(<AllMoviesPage />);

		expect(screen.getByTestId("upTest")).toHaveStyle("opacity: 0");
	});
});
