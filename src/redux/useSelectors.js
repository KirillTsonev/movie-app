import {useSelector} from "react-redux";

const useSelectors = () => {
	const results = useSelector((state) => state.home.results);
	const paginationSlice = useSelector((state) => state.home.paginationSlice);
	const movies = useSelector((state) => state.home.movies);
	const data = useSelector((state) => state.home.data);

	const complexSearch = useSelector((state) => state.queries.complexSearch);
	const title = useSelector((state) => state.queries.title);
	const year = useSelector((state) => state.queries.year);
	const cast = useSelector((state) => state.queries.cast);
	const genres = useSelector((state) => state.queries.genres);

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
	};
};

export default useSelectors;
