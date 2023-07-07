import {useSelector} from "react-redux";

const useSelectors = () => {
	const results = useSelector((state) => state.home.results);
	const paginationIndex = useSelector((state) => state.home.paginationIndex);
	const movies = useSelector((state) => state.home.movies);
	const data = useSelector((state) => state.home.data);
	const complexSearch = useSelector((state) => state.home.complexSearch);
	const totalResults = useSelector((state) => state.home.totalResults);

	const title = useSelector((state) => state.queries.title);
	const yearStore = useSelector((state) => state.queries.yearStore);
	const castStore = useSelector((state) => state.queries.castStore);
	const genresStore = useSelector((state) => state.queries.genresStore);

	return {
		results,
		paginationIndex,
		title,
		yearStore,
		castStore,
		genresStore,
		movies,
		data,
		complexSearch,
		totalResults,
	};
};

export default useSelectors;
