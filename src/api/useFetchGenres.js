import {useQuery} from "react-query";

import {apiAuthorization} from "../constants";

const useFetchGenres = () => {
	const {data: dataGenres} = useQuery({
		queryKey: ["fetchGenres"],
		queryFn: () => fetchGenres().then((res) => res.json()),
	});

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
