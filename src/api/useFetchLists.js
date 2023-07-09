import {useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import {useDispatch} from "react-redux";

import {accountID, headers} from "../constants";
import {setFavorite, setWatchList} from "../redux/collectionsSlice";

import useSelectors from "../redux/useSelectors";

const useFetchLists = () => {
	const {favorite, watchlist} = useSelectors();
	const {data: dataFavorite, fetchNextPage: fetchNextPageFavorite} = useInfiniteQuery({
		queryKey: ["fetchFavorites"],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "favorite"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
	});
	const {data: dataWatchlist, fetchNextPage: fetchNextPageWatchlist} = useInfiniteQuery({
		queryKey: ["fetchWatchlist"],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "watchlist"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dataFavorite?.pages.forEach((page) =>
			dispatch(setFavorite([...new Set([...favorite, ...page.results.map((a) => a.id)])]))
		);

		fetchNextPageFavorite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataFavorite]);

	useEffect(() => {
		dataWatchlist?.pages.forEach((page) =>
			dispatch(setWatchList([...new Set([...watchlist, ...page.results.map((a) => a.id)])]))
		);

		fetchNextPageWatchlist();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataWatchlist]);

	async function fetchLists(pageParam, collection) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(
			`https://api.themoviedb.org/3/account/${accountID}/${collection}/movies?language=en-US&page=${pageParam}&sort_by=created_at.asc`,
			options
		).then((response) => response.json());
	}

	return {};
};

export default useFetchLists;
