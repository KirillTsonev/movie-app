import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {setMovies, setPaginationSlice, setPaginationIndex} from "../redux/homeSlice";
import useSelectors from "../redux/useSelectors";
import useSearchBarComplex from "../api/useSearchBarComplex";

const usePagination = () => {
	const {paginationSlice, data, movies, results} = useSelectors();
	const {refetchSearchComplex} = useSearchBarComplex();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setMovies([...new Set([...movies, ...data])].slice(0, paginationSlice)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, paginationSlice]);

	function paginate() {
		dispatch(setPaginationSlice());

		if (data.length === movies.length || movies.length === 10) {
			dispatch(setPaginationIndex());

			if (results === "complex") {
				refetchSearchComplex();
			}
		}
	}

	return {paginate};
};

export default usePagination;
