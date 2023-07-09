import {useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import {useDispatch} from "react-redux";

import {accountID, headers} from "../constants";
import {setFavorite, setWatchList, setRated} from "../redux/collectionsSlice";

import useSelectors from "../redux/useSelectors";

const useFetchLists = () => {
	const {favorite, watchlist, rated} = useSelectors();
	const {
		data: dataFavorite,
		fetchNextPage: fetchNextPageFavorite,
		refetch: refetchFavorite,
	} = useInfiniteQuery({
		queryKey: ["fetchFavorites"],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "favorite"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		// enabled: false,
	});
	const {
		data: dataWatchlist,
		fetchNextPage: fetchNextPageWatchlist,
		refetch: refetchWatchlist,
	} = useInfiniteQuery({
		queryKey: ["fetchWatchlist"],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "watchlist"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		// enabled: false,
	});
	const {
		data: dataRated,
		fetchNextPage: fetchNextPageRated,
		refetch: refetchRated,
	} = useInfiniteQuery({
		queryKey: ["fetchRated"],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "rated"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		// enabled: false,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dataFavorite?.pages.forEach((page) =>
			dispatch(setFavorite([...new Set([...favorite, ...page.results.map((a) => a.id)])]))
		);

		if (favorite.length % 20 === 0) {
			fetchNextPageFavorite();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataFavorite]);

	useEffect(() => {
		dataWatchlist?.pages.forEach((page) =>
			dispatch(setWatchList([...new Set([...watchlist, ...page.results.map((a) => a.id)])]))
		);

		if (watchlist.length % 20 === 0) {
			fetchNextPageWatchlist();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataWatchlist]);

	useEffect(() => {
		dataRated?.pages.forEach((page) =>
			dispatch(setRated([...new Set([...rated, ...page.results.map((a) => (a = {id: a.id, rating: a.rating}))])]))
		);

		if (rated.length % 20 === 0) {
			fetchNextPageRated();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataRated]);

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
