import {useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import {headers, accountID} from "../constants";
import useSelectors from "../redux/useSelectors";
import useGetPlayingNow from "./useGetPlayingNow";
import {setDataCollectionsStore, setFavorites} from "../redux/collectionsSlice";
import {setData} from "../redux/homeSlice";

const useFetchCollections = () => {
	const {dataCollectionsStore, results, favorites, data} = useSelectors();
	const {clearSearch} = useGetPlayingNow();
	const {
		isLoading: isLoadingCollections,
		error: errorCollections,
		data: dataCollections,
		refetch: refetchCollections,
	} = useQuery({
		queryKey: ["fetchCollections"],
		queryFn: () => fetchCollections(),
		// keepPreviousData: true,
		// enabled: false,
		// cacheTime: 0,
	});

	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (location.pathname === "/collections") {
			clearSearch("collection");
		}

		// if (results === "collection") {
		// 	refetchCollections();
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (results === "collection" && dataCollections) {
			dispatch(setDataCollectionsStore([...new Set([...dataCollectionsStore, ...dataCollections.results])]));
			dispatch(setData([...new Set([...data, ...dataCollections.results])]));

			// dispatch(setTotalResults(dataPlaying.total_results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataCollections, results]);

	async function fetchCollections() {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(
			`https://api.themoviedb.org/3/account/${accountID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
			options
		).then((response) => response.json());
	}

	return {isLoadingCollections, errorCollections};
};

export default useFetchCollections;
