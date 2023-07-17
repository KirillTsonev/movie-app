import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import useSelectors from "../../redux/useSelectors";
import useClearData from "../../hooks/useClearData";
import useCollectionsQuery from "../reactQueryHooks/useCollectionsQuery";
import {setData} from "../../redux/homeSlice";
import {setTotalResults} from "../../redux/settingsSlice";

const useCollectionsLogic = () => {
	const [currentCollection, setCurrentCollection] = useState("favorite");

	const location = useLocation();
	const dispatch = useDispatch();

	const {results} = useSelectors();
	const {clearData} = useClearData();
	const {
		dataCollections,
		refetchCollections,
		isFetchingCollections,
		errorCollections,
		isSuccessCollections,
		fetchNextPageCollections,
	} = useCollectionsQuery(currentCollection);

	useEffect(() => {
		if (results === "collection" && dataCollections) {
			dispatch(setTotalResults(dataCollections));
			dispatch(setData(dataCollections));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataCollections]);

	useEffect(() => {
		if (location.pathname === "/collections") {
			clearData("collection", refetchCollections);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isFetchingCollections,
		errorCollections,
		refetchCollections,
		setCurrentCollection,
		currentCollection,
		isSuccessCollections,
		fetchNextPageCollections,
	};
};

export default useCollectionsLogic;
