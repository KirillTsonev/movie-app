import {useEffect} from "react";
import {useDispatch} from "react-redux";

import useSelectors from "../../redux/useSelectors";
import useListsQuery from "../reactQueryHooks/useListsQuery";
import {setFavorite, setWatchList, setRated} from "../../redux/collectionsSlice";

const useListsLogic = () => {
	const dispatch = useDispatch();

	const {favorite, watchlist, rated} = useSelectors();
	const {dataFavorite, dataWatchlist, dataRated, fetchNextPageFavorite, fetchNextPageWatchlist, fetchNextPageRated} =
		useListsQuery();

	useEffect(() => {
		dataFavorite.pages.forEach((page) =>
			dispatch(setFavorite([...new Set([...favorite, ...page.results.map((a) => a.id)])]))
		);

		if (favorite.length % 20 === 0) {
			fetchNextPageFavorite();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataFavorite]);

	useEffect(() => {
		dataWatchlist?.pages?.forEach((page) =>
			dispatch(setWatchList([...new Set([...watchlist, ...page.results.map((a) => a.id)])]))
		);

		if (watchlist.length % 20 === 0) {
			fetchNextPageWatchlist();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataWatchlist]);

	useEffect(() => {
		dataRated?.pages?.forEach((page) => dispatch(setRated(page.results)));

		if (rated.length % 20 === 0) {
			fetchNextPageRated();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataRated]);

	return {};
};

export default useListsLogic;
