import {useEffect} from "react";
import {useQuery} from "react-query";

import {apiAuthorization} from "../constants";

const useFetchGenres = () => {
	const {data: dataGenres, refetch: refetchGenres} = useQuery({
		queryKey: ["fetchGenres"],
		queryFn: () => fetchGenres().then((res) => res.json()),
		enabled: false,
	});

	useEffect(() => {
		refetchGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function fetchGenres() {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options);
	}

	return {dataGenres};
};

export default useFetchGenres;
