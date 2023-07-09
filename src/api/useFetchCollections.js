import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import {headers, accountID} from "../constants";
import useSelectors from "../redux/useSelectors";
import useClearData from "../hooks/useClearData";
import {setData} from "../redux/homeSlice";
import {setTotalResults} from "../redux/settingsSlice";

const useFetchCollections = () => {
	const [currentCollection, setCurrentCollection] = useState("favorite");

	const {results, data, paginationIndex} = useSelectors();
	const {clearData} = useClearData();
	const {
		isFetching: isFetchingCollections,
		error: errorCollections,
		data: dataCollections,
		refetch: refetchCollections,
	} = useQuery({
		queryKey: ["fetchCollections"],
		queryFn: () => fetchCollections(paginationIndex, currentCollection),
		keepPreviousData: true,
		enabled: false,
	});

	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (location.pathname === "/collections") {
			clearData("collection", refetchCollections);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (results === "collection" && dataCollections) {
			dispatch(setData([...new Set([...data, ...dataCollections.results])]));
			dispatch(setTotalResults(dataCollections.total_results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataCollections, results]);

	async function fetchCollections(num, collection) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(
			`https://api.themoviedb.org/3/account/${accountID}/${collection}/movies?language=en-US&page=${num}&sort_by=created_at.asc`,
			options
		).then((response) => response.json());
	}

	return {isFetchingCollections, errorCollections, refetchCollections, setCurrentCollection, currentCollection};
};

export default useFetchCollections;
