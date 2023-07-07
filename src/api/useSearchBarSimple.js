import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData, setTotalResults} from "../redux/homeSlice";

import useSelectors from "../redux/useSelectors";

import {apiAuthorization} from "../constants";

const useSearchBarSimple = () => {
	const [searchString, setSearchString] = useState("");
	const {results, paginationIndex, title} = useSelectors();
	const dispatch = useDispatch();

	const {
		isLoading: isLoadingSearchSimple,
		error: errorSearchSimple,
		data: dataSearchSimple,
		refetch: refetchSearchSimple,
	} = useQuery({
		queryKey: ["simpleSearch", paginationIndex],
		queryFn: () => fetchSimpleSearch(paginationIndex).then((res) => res.json()),
		keepPreviousData: true,
		enabled: results === "simple" ? true : false,
	});

	useEffect(() => {
		if (dataSearchSimple && results === "simple") {
			dispatch(setTotalResults(dataSearchSimple.total_results));
			dispatch(setData(dataSearchSimple.results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchSimple]);

	function fetchSimpleSearch(num) {
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
		);
	}

	return {
		refetchSearchSimple,
		isLoadingSearchSimple,
		errorSearchSimple,
		searchString,
		setSearchString,
	};
};

export default useSearchBarSimple;
