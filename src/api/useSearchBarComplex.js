import {useState, useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import {useDispatch} from "react-redux";

import useSelectors from "../redux/useSelectors";
import createComplexLink from "./createComplexLink";
import {setData} from "../redux/homeSlice";
import {setTotalResults} from "../redux/settingsSlice";
import {headers} from "../constants";

const useSearchBarComplex = () => {
	const [yearState, setYearState] = useState("");
	const [castState, setCastState] = useState("");

	const dispatch = useDispatch();

	const {results, genres, year, cast} = useSelectors();
	const {
		isFetching: isFetchingSearchComplex,
		error: errorSearchComplex,
		data: dataSearchComplex,
		refetch: refetchSearchComplex,
		fetchNextPage: fetchNextPageSearchComplex,
	} = useInfiniteQuery({
		queryKey: ["complexSearch", results],
		queryFn: ({pageParam = 1}) => fetchComplexSearch({year, cast, genres, num: pageParam}),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	useEffect(() => {
		if (results === "complex" && dataSearchComplex) {
			dispatch(setTotalResults(dataSearchComplex));
			dispatch(setData(dataSearchComplex));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchComplex]);

	async function fetchComplexSearch({year, cast, genres, num}) {
		const options = {
			method: "GET",
			headers,
		};

		const link = await createComplexLink({year, cast, genres, num});

		return fetch(link, options).then((res) => res.json());
	}

	return {
		refetchSearchComplex,
		isFetchingSearchComplex,
		errorSearchComplex,
		dataSearchComplex,
		yearState,
		castState,
		setYearState,
		setCastState,
		fetchNextPageSearchComplex,
	};
};

export default useSearchBarComplex;
