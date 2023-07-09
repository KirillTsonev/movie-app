import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {headers} from "../constants";
import {setTotalResults} from "../redux/settingsSlice";
import useSelectors from "../redux/useSelectors";

const useSearchBarSimple = () => {
	const [titleState, setTitleState] = useState("");

	const {results, data, title, paginationIndex} = useSelectors();
	const {
		isFetching: isFetchingSearchSimple,
		error: errorSearchSimple,
		data: dataSearchSimple,
		refetch: refetchSearchSimple,
	} = useQuery({
		queryKey: ["simpleSearch"],
		queryFn: () => fetchSimpleSearch(paginationIndex),
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "simple" && dataSearchSimple) {
			dispatch(setData([...new Set([...data, ...dataSearchSimple.results])]));
			dispatch(setTotalResults(dataSearchSimple.total_results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchSimple]);

	async function fetchSimpleSearch(num) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(
			`https://api.themoviedb.org/3/search/movie?query=${
				!!titleState ? titleState : title
			}&include_adult=false&language=en-US&page=` + num,
			options
		).then((res) => res.json());
	}

	return {
		refetchSearchSimple,
		isFetchingSearchSimple,
		errorSearchSimple,
		titleState,
		setTitleState,
		dataSearchSimple,
	};
};

export default useSearchBarSimple;
