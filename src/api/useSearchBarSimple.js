import {useState, useContext, useEffect} from "react";
import {useQuery} from "react-query";

import {apiAuthorization} from "../constants";
import {MoviesContext} from "../context/moviesContext";

const useSearchBarSimple = () => {
	const [searchString, setSearchString] = useState("");

	const {setData, results} = useContext(MoviesContext);

	const {
		isLoading: isLoadingSearchSimple,
		error: errorSearchSimple,
		data: dataSearchSimple,
		refetch: refetchSearchSimple,
	} = useQuery({
		queryKey: ["simpleSearch"],
		queryFn: () => fetchSimpleSearch().then((res) => res.json()),
		enabled: false,
	});

	useEffect(() => {
		if (dataSearchSimple && results === "simple") {
			setData(dataSearchSimple.results);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchSimple]);

	function fetchSimpleSearch() {
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

	return {
		refetchSearchSimple,
		isLoadingSearchSimple,
		errorSearchSimple,
		searchString,
		setSearchString,
	};
};

export default useSearchBarSimple;
