import {useEffect} from "react";
import {useDispatch} from "react-redux";

import useSelectors from "../redux/useSelectors";
import useSearchComplexQuery from "../api/reactQueryHooks/useSearchComplexQuery";
import useSearchSimpleQuery from "../api/reactQueryHooks/useSearchSimpleQuery";
import usePlayingNowQuery from "../api/reactQueryHooks/usePlayingNowQuery";
import useCollectionsQuery from "../api/reactQueryHooks/useCollectionsQuery";
import {setMovies, setPaginationSlice} from "../redux/homeSlice";

const usePagination = () => {
	const dispatch = useDispatch();

	const {paginationSlice, data, movies, results} = useSelectors();
	const {fetchNextPageSearchComplex} = useSearchComplexQuery();
	const {fetchNextPageSearchSimple} = useSearchSimpleQuery();
	const {fetchNextPagePlaying} = usePlayingNowQuery();
	const {fetchNextPageCollections} = useCollectionsQuery();

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
