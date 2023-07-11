import {useEffect} from "react";
import {useDispatch} from "react-redux";

import useSelectors from "../redux/useSelectors";
import useSearchBarComplex from "../api/useSearchBarComplex";
import useSearchBarSimple from "../api/useSearchBarSimple";
import useGetPlayingNow from "../api/useGetPlayingNow";
import useFetchCollections from "../api/useFetchCollections";
import {setMovies, setPaginationSlice} from "../redux/homeSlice";

const usePagination = () => {
	const dispatch = useDispatch();

	const {paginationSlice, data, movies, results} = useSelectors();
	const {fetchNextPageSearchComplex} = useSearchBarComplex();
	const {fetchNextPageSearchSimple} = useSearchBarSimple();
	const {fetchNextPagePlaying} = useGetPlayingNow();
	const {fetchNextPageCollections} = useFetchCollections();

	useEffect(() => {
		dispatch(setMovies(data.slice(0, paginationSlice)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, paginationSlice]);

	function paginate() {
		dispatch(setPaginationSlice());

		if (data.length === movies.length) {
			fetchNextPageSearchComplex();
			fetchNextPageSearchSimple();

			if (results === "all") {
				fetchNextPagePlaying();
			}

			if (results === "collection") {
				fetchNextPageCollections();
			}
		}
	}

	return {paginate};
};

export default usePagination;
