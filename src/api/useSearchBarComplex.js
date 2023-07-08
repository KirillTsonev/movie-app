import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {setTotalResults} from "../redux/settingsSlice";
import {apiAuthorization} from "../constants";
import useSelectors from "../redux/useSelectors";
import createComplexLink from "./createComplexLink";

const useSearchBarComplex = () => {
	const [yearState, setYearState] = useState("");
	const [castState, setCastState] = useState("");

	const dispatch = useDispatch();

	const {results, genres, data, year, cast, paginationIndex} = useSelectors();
	const {
		isLoading: isLoadingSearchComplex,
		error: errorSearchComplex,
		data: dataSearchComplex,
		refetch: refetchSearchComplex,
	} = useQuery({
		queryKey: ["complexSearch"],
		queryFn: () => fetchComplexSearch({year, yearState, cast, castState, genres, num: paginationIndex}),
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	useEffect(() => {
		if (results === "complex" && dataSearchComplex) {
			dispatch(setData([...new Set([...data, ...dataSearchComplex.results])]));
			dispatch(setTotalResults(dataSearchComplex.total_results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchComplex]);

	async function fetchComplexSearch({year, yearState, cast, castState, genres, num}) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		const link = await createComplexLink({year, yearState, cast, castState, genres, num});

		return fetch(link, options).then((res) => res.json());
	}

	return {
		refetchSearchComplex,
		isLoadingSearchComplex,
		errorSearchComplex,
		dataSearchComplex,
		yearState,
		castState,
		setYearState,
		setCastState,
	};
};

export default useSearchBarComplex;
