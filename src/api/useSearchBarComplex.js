import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {setData, setTotalResults} from "../redux/homeSlice";

import {apiAuthorization} from "../constants";

import useSelectors from "../redux/useSelectors";

const useSearchBarComplex = () => {
	const [castState, setCastState] = useState("");
	const [yearState, setYearState] = useState("");
	const [genresState, setGenresState] = useState("");
	const {results, paginationIndex, yearStore, castStore, genresStore} = useSelectors();
	const dispatch = useDispatch();

	const {
		isLoading: isLoadingSearchComplex,
		error: errorSearchComplex,
		data: dataSearchComplex,
		refetch: refetchSearchComplex,
	} = useQuery({
		queryKey: ["complexSearch", paginationIndex],
		queryFn: () => fetchComplexSearch(paginationIndex).then((res) => res.json()),
		keepPreviousData: true,
		enabled: results === "complex" ? true : false,
	});

	useEffect(() => {
		if (dataSearchComplex && results === "complex") {
			dispatch(setTotalResults(dataSearchComplex.total_results));
			dispatch(setData(dataSearchComplex.results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchComplex]);

	async function fetchCast(actor) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		actor = actor.replace(" ", "%20");

		const response = await fetch(
			`https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=en-US&page=1`,
			options
		);

		const result = await response.json();

		return result.results[0].id;
	}

	async function fetchComplexSearch(num) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		let link =
			"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" +
			num;

		if (yearStore) {
			link += `&primary_release_year=${yearStore}&sort_by=popularity.desc`;
		} else {
			link += "&sort_by=popularity.desc";
		}

		if (castStore) {
			const castForFetch = castStore.split(",").map((a) => (a = a.trim()));

			let data = await Promise.all(
				castForFetch.map(async (a) => {
					return await fetchCast(a);
				})
			);

			link += `&with_cast=${data.join(",")}`;
		}

		if (genresStore) {
			link += `&with_genres=${genresStore.join(",")}`;
		}

		setCastState("");
		setYearState("");
		setGenresState("");

		return fetch(link, options);
	}

	return {
		refetchSearchComplex,
		isLoadingSearchComplex,
		errorSearchComplex,
		yearState,
		setYearState,
		castState,
		setCastState,
		setGenresState,
	};
};

export default useSearchBarComplex;
