import React from "react";
import {Button, Box} from "@chakra-ui/react";

import useClearData from "../hooks/useClearData";

const CollectionsFilters = ({setCurrentCollection, currentCollection, refetchCollections}) => {
	const {clearData} = useClearData();

	function filterCollections(collection) {
		clearData("collection", refetchCollections);

		setCurrentCollection(collection);
	}

	return (
		<Box
			display="flex"
			justifyContent="space-around"
		>
			<Button
				w="30%"
				style={
					currentCollection === "favorite"
						? {
								background: "#17b824",
								transform: "translateX(5px) translateY(-5px)",
								boxShadow:
									"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
						  }
						: null
				}
				onClick={() => filterCollections("favorite")}
			>
				Favorites
			</Button>
			<Button
				w="30%"
				style={
					currentCollection === "watchlist"
						? {
								background: "#17b824",
								transform: "translateX(5px) translateY(-5px)",
								boxShadow:
									"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
						  }
						: null
				}
				onClick={() => filterCollections("watchlist")}
			>
				Watchlsit
			</Button>
			<Button
				w="30%"
				style={
					currentCollection === "rated"
						? {
								background: "#17b824",
								transform: "translateX(5px) translateY(-5px)",
								boxShadow:
									"-1px 1px 1px #006400, -2px 2px 1px #006400, -3px 3px 1px #006400, -4px 4px 1px #006400, -5px 5px 1px #006400",
						  }
						: null
				}
				onClick={() => filterCollections("rated")}
			>
				Rated
			</Button>
		</Box>
	);
};

export default CollectionsFilters;
