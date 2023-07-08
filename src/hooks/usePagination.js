import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {setMovies, setPaginationSlice} from "../redux/homeSlice";
import useSelectors from "../redux/useSelectors";

const usePagination = () => {
	const {paginationSlice, data, movies} = useSelectors();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setMovies([...new Set([...movies, ...data])].slice(0, paginationSlice)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, paginationSlice]);

	function paginate() {
		dispatch(setPaginationSlice(paginationSlice + 10));
	}

	return {paginate};
};

export default usePagination;
