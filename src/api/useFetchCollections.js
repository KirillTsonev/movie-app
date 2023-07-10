import {useEffect, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import {headers, accountID} from "../constants";
import useSelectors from "../redux/useSelectors";
import useClearData from "../hooks/useClearData";
import {setData} from "../redux/homeSlice";
import {setTotalResults} from "../redux/settingsSlice";

const useFetchCollections = () => {
	const [currentCollection, setCurrentCollection] = useState("favorite");

	const {results} = useSelectors();
	const {clearData} = useClearData();
	const {
		isFetching: isFetchingCollections,
		isSuccess: isSuccessCollections,
		error: errorCollections,
		data: dataCollections,
		refetch: refetchCollections,
		fetchNextPage: fetchNextPageCollections,
	} = useInfiniteQuery({
		queryKey: ["fetchCollections", results],
		queryFn: ({pageParam = 1}) => fetchCollections(pageParam, currentCollection),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "collection" && dataCollections) {
			dispatch(setTotalResults(dataCollections.pages[0].total_results));
			dispatch(setData([...dataCollections.pages.map((a) => a.results)].flat()));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataCollections]);

	useEffect(() => {
		if (location.pathname === "/collections") {
			clearData("collection", refetchCollections);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

export default useFetchCollections;
