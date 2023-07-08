import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {resetQueriesState} from "../redux/queriesSlice";
import {apiAuthorization} from "../constants";
import useSelectors from "../redux/useSelectors";
import createComplexLink from "./createComplexLink";

const useSearchBarComplex = () => {
	const [paginationIndex, setPaginationIndex] = useState(1);

	const {results, year, cast, genres, data} = useSelectors();
	const {
		isLoading: isLoadingSearchComplex,
		error: errorSearchComplex,
		data: dataSearchComplex,
		refetch: refetchSearchComplex,
	} = useQuery({
		queryKey: ["complexSearch", paginationIndex],
		queryFn: () => fetchComplexSearch({year, cast, genres, paginationIndex}).then((res) => res.json()),
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "complex") {
			if (dataSearchComplex) {
				dispatch(setData([...new Set([...data, ...dataSearchComplex.results])]));

				if (paginationIndex < 5 && (!!year || !!cast || !!genres)) {
					refetchSearchComplex();
					setPaginationIndex(paginationIndex + 1);
				} else {
					dispatch(resetQueriesState());
					setPaginationIndex(1);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchComplex, paginationIndex]);

	async function fetchComplexSearch({year, cast, genres, num}) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		console.log(genres);

		const link = await createComplexLink({year, cast, genres, num});

		return fetch(link, options);
	}

	return {
		refetchSearchComplex,
		isLoadingSearchComplex,
		errorSearchComplex,
	};
};

export default useSearchBarComplex;
