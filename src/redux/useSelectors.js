import {useSelector} from "react-redux";

const useSelectors = () => {
	const paginationSlice = useSelector((state) => state.home.paginationSlice);
	const paginationIndex = useSelector((state) => state.home.paginationIndex);
	const movies = useSelector((state) => state.home.movies);
	const data = useSelector((state) => state.home.data);

	const results = useSelector((state) => state.queries.results);
	const title = useSelector((state) => state.queries.title);
	const year = useSelector((state) => state.queries.year);
	const cast = useSelector((state) => state.queries.cast);
	const genres = useSelector((state) => state.queries.genres);

	const complexSearch = useSelector((state) => state.settings.complexSearch);
	const searched = useSelector((state) => state.settings.searched);
	const totalResults = useSelector((state) => state.settings.totalResults);

	const dataCollectionsStore = useSelector((state) => state.collections.dataCollectionsStore);
	const moviesCollections = useSelector((state) => state.collections.moviesCollections);
	const favorites = useSelector((state) => state.collections.favorites);
	const watchlist = useSelector((state) => state.collections.watchlist);

	return {
		results,
		paginationSlice,
		paginationIndex,
		title,
		year,
		cast,
		genres,
		movies,
		data,
		complexSearch,
		searched,
		totalResults,
		dataCollectionsStore,
		moviesCollections,
		favorites,
		watchlist,
	};
};

export default useSelectors;
