import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";

import AllMoviesPage from "../pages/AllMoviesPage";
import CollectionsPage from "../pages/CollectionsPage";
import Error404Page from "../pages/Error404Page";

import {setupStore} from "../redux/store";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AllMoviesPage />,
	},
	{
		path: "/collections",
		element: <CollectionsPage />,
	},
	{
		path: "/*",
		element: <Error404Page />,
	},
]);

const queryClient = new QueryClient();

const store = setupStore();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default App;
