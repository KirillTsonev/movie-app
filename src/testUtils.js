import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import theme from "./theme/theme";
import {setupStore} from "./redux/store";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const AllTheProviders = ({children}) => {
	return (
		<Provider store={setupStore()}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<ChakraProvider theme={theme}>{children}</ChakraProvider>;
				</QueryClientProvider>
			</BrowserRouter>
		</Provider>
	);
};

export function renderWithProviders(ui, options) {
	render(ui, {wrapper: AllTheProviders, ...options});
}
