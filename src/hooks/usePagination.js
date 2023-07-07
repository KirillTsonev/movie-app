import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setMovies, setPaginationSlice, setPaginationIndex} from "../redux/homeSlice";

const usePagination = () => {
	const paginationIndex = useSelector((state) => state.home.paginationIndex);
	const paginationSlice = useSelector((state) => state.home.paginationSlice);
	const data = useSelector((state) => state.home.data);
	const movies = useSelector((state) => state.home.movies);
	const dispatch = useDispatch();

	useEffect(() => {
		if (paginationSlice === 10) {
			dispatch(setMovies(data?.slice(0, paginationSlice)));
		} else {
			dispatch(setMovies([...new Set([...movies, ...data])].slice(0, paginationSlice)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, paginationSlice]);

	function paginate() {
		if ((movies.length / 10) % 2 === 0) {
			dispatch(setPaginationIndex(paginationIndex + 1));
		}

		dispatch(setPaginationSlice(paginationSlice + 10));
	}

	return {paginate};
};

export default usePagination;
