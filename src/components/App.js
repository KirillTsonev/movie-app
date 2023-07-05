import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";

import AllMoviesPage from "../pages/AllMoviesPage";
import CollectionsPage from "../pages/CollectionsPage";
import Error404Page from "../pages/Error404Page";

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

function App() {
	return (
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
