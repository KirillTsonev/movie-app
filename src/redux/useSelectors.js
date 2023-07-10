import {useSelector} from "react-redux";

const useSelectors = () => {
	const paginationSlice = useSelector((state) => state.home.paginationSlice);
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

	const favorite = useSelector((state) => state.collections.favorite);
	const watchlist = useSelector((state) => state.collections.watchlist);
	const rated = useSelector((state) => state.collections.rated);
	const details = useSelector((state) => state.collections.details);

	return {
		results,
		paginationSlice,
		title,
		year,
		cast,
		genres,
		movies,
		data,
		complexSearch,
		searched,
		totalResults,
		favorite,
		watchlist,
		rated,
		details,
	};
};

export default useSelectors;
