import {useState, useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {headers} from "../constants";
import {setTotalResults} from "../redux/settingsSlice";
import useSelectors from "../redux/useSelectors";

const useSearchBarSimple = () => {
	const [titleState, setTitleState] = useState("");

	const {results, title} = useSelectors();
	const {
		isFetching: isFetchingSearchSimple,
		error: errorSearchSimple,
		data: dataSearchSimple,
		refetch: refetchSearchSimple,
		fetchNextPage: fetchNextPageSearchSimple,
	} = useInfiniteQuery({
		queryKey: ["simpleSearch", results],
		queryFn: ({pageParam = 1}) => fetchSimpleSearch(pageParam),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "simple" && dataSearchSimple) {
			dispatch(setTotalResults(dataSearchSimple.pages[0].total_results));
			dispatch(setData([...dataSearchSimple.pages.map((a) => a.results)].flat()));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchSimple]);

	async function fetchSimpleSearch(num) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(
			`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=` + num,
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
		fetchNextPageSearchSimple,
	};
};

export default useSearchBarSimple;
