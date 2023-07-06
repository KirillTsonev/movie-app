import {useState, useContext, useEffect} from "react";
import {useQuery} from "react-query";

import {apiAuthorization} from "../constants";
import {MoviesContext} from "../context/moviesContext";

const useSearchBarComplex = () => {
	const [cast, setCast] = useState("");
	const [year, setYear] = useState(0);
	const [selectedGenresApi, setSelectedGenresApi] = useState("");

	const {setData, results} = useContext(MoviesContext);

	const {
		isLoading: isLoadingSearchComplex,
		error: errorSearchComplex,
		data: dataSearchComplex,
		refetch: refetchSearchComplex,
	} = useQuery({
		queryKey: ["complexSearch"],
		queryFn: () => fetchComplexSearch().then((res) => res.json()),
		enabled: false,
	});

	useEffect(() => {
		if (dataSearchComplex && results === "complex") {
			setData(dataSearchComplex.results);
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

	async function fetchComplexSearch() {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		let link =
			"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1";

		if (year) {
			link += `&primary_release_year=${year}&sort_by=popularity.desc`;
		} else {
			link += "&sort_by=popularity.desc";
		}

		if (cast) {
			const castForFetch = cast.split(",").map((a) => (a = a.trim()));

			let data = await Promise.all(
				castForFetch.map(async (a) => {
					return await fetchCast(a);
				})
			);

			link += `&with_cast=${data.join(",")}`;
		}

		if (selectedGenresApi) {
			link += `&with_genres=${selectedGenresApi.join(",")}`;
		}

		return fetch(link, options);
	}

	return {
		refetchSearchComplex,
		isLoadingSearchComplex,
		errorSearchComplex,
		year,
		setYear,
		cast,
		setCast,
		setSelectedGenresApi,
	};
};

export default useSearchBarComplex;
