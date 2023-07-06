import {useState, useContext, useEffect} from "react";
import {useQuery} from "react-query";

import {apiAuthorization} from "../constants";
import {MoviesContext} from "../context/moviesContext";

const useSearchBarSimple = () => {
	const [searchString, setSearchString] = useState("");

	const {setMovies} = useContext(MoviesContext);

	const {
		isLoading: isLoadingSearch,
		error: errorSearch,
		data: dataSearch,
		refetch: refetchSearch,
	} = useQuery({
		queryKey: ["simpleSearch"],
		queryFn: () => fetchSearch().then((res) => res.json()),
		enabled: false,
	});

	useEffect(() => {
		if (dataSearch?.results.length) {
			setMovies(dataSearch.results.slice(0, 10));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearch]);

	function paginateSearch() {
		setMovies(dataSearch.results.slice(0, 20));
	}

	function fetchSearch() {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		setSearchString("");

		return fetch(
			`https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1`,
			options
		);
	}

	return {refetchSearch, isLoadingSearch, errorSearch, searchString, setSearchString, paginateSearch};
};

export default useSearchBarSimple;
