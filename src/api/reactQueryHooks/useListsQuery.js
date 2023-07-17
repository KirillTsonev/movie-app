import {useInfiniteQuery} from "react-query";

import fetchLists from "../fetches/fetchCollections";
import useSelectors from "../../redux/useSelectors";

const useListsQuery = () => {
	const {favorite, watchlist, rated} = useSelectors();
	const {data: dataFavorite, fetchNextPage: fetchNextPageFavorite} = useInfiniteQuery({
		queryKey: ["fetchFavorites", favorite],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "favorite"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		enabled: false,
	});
	const {data: dataWatchlist, fetchNextPage: fetchNextPageWatchlist} = useInfiniteQuery({
		queryKey: ["fetchWatchlist", watchlist],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "watchlist"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		enabled: false,
	});
	const {data: dataRated, fetchNextPage: fetchNextPageRated} = useInfiniteQuery({
		queryKey: ["fetchRated", rated],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, "rated"),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		enabled: false,
	});

	return {dataFavorite, dataWatchlist, dataRated, fetchNextPageFavorite, fetchNextPageWatchlist, fetchNextPageRated};
};

export default useListsQuery;
