import userEvent from "@testing-library/user-event";
import {screen} from "@testing-library/react";

import NavBar from "../NavBar";
import {renderWithProviders} from "../../testUtils";

describe("<NavBar/>", () => {
	test("renders two links", () => {
		renderWithProviders(<NavBar />);

		expect(screen.getAllByRole("link")).toHaveLength(2);
	});

	test("when clicking the Collections link it becomes active", async () => {
		const user = userEvent.setup();

		renderWithProviders(<NavBar />);

		const link = screen.getByRole("link", {name: /your collections/i});

		await user.click(link);

		expect(link).toHaveStyle("transform: translateX(5px) translateY(-5px)");
	});
});
