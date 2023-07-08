import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {resetQueriesState} from "../redux/queriesSlice";
import useSelectors from "../redux/useSelectors";
import {apiAuthorization} from "../constants";

const useSearchBarSimple = () => {
	const [searchString, setSearchString] = useState("");
	const [paginationIndex, setPaginationIndex] = useState(1);

	const {results, data, title} = useSelectors();
	const {
		isLoading: isLoadingSearchSimple,
		error: errorSearchSimple,
		data: dataSearchSimple,
		refetch: refetchSearchSimple,
	} = useQuery({
		queryKey: ["simpleSearch", paginationIndex],
		queryFn: () => fetchSimpleSearch(paginationIndex),
		keepPreviousData: true,
		enabled: results === "simple" ? true : false,
		cacheTime: 0,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "simple") {
			if (dataSearchSimple) {
				dispatch(setData([...new Set([...data, ...dataSearchSimple.results])]));

				if (paginationIndex < 5 && title) {
					setPaginationIndex(paginationIndex + 1);
				} else {
					setPaginationIndex(1);
					dispatch(resetQueriesState());
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchSimple]);

	async function fetchSimpleSearch(num) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		setSearchString("");

		return fetch(
			`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=` + num,
			options
		).then((res) => res.json());
	}

	return {
		refetchSearchSimple,
		isLoadingSearchSimple,
		errorSearchSimple,
		searchString,
		setSearchString,
		setPaginationIndex,
	};
};

export default useSearchBarSimple;
