import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import AllMoviesPage from "../pages/AllMoviesPage";
import CollectionsPage from "../pages/CollectionsPage";
import Error404Page from "../pages/Error404Page";
import {MoviesProvider} from "../context/moviesContext";

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

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<MoviesProvider>
					<RouterProvider router={router} />
				</MoviesProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default App;
