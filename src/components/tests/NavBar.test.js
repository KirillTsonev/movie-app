import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter} from "react-router-dom";

import {renderWithProviders} from "../../testUtils";

import NavBar from "../NavBar";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

describe("<NavBar/>", () => {
	test("renders two links", () => {
		renderWithProviders(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<NavBar />
				</BrowserRouter>
			</QueryClientProvider>
		);

		expect(screen.getAllByRole("link")).toHaveLength(2);
	});

	test("when clicking the Collections link it becomes active", async () => {
		const user = userEvent.setup();

		renderWithProviders(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<NavBar />
				</BrowserRouter>
			</QueryClientProvider>
		);

		const link = screen.getByRole("link", {name: /your collections/i});

		await user.click(link);

		// expect(link).toBeInTheDocument();
		expect(link).toHaveStyle("transform: translateX(5px) translateY(-5px)");
	});
});
