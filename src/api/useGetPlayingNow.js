import {useQuery} from "react-query";

import {apiAuthorization} from "../constants";

const useGetPlayingNow = () => {
	const {isLoading, error, data} = useQuery({
		queryKey: ["playingNow"],
		queryFn: () => fetchMovies().then((res) => res.json()),
	});

	function fetchMovies() {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		return fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);
	}

	return {isLoading, error, data};
};

export default useGetPlayingNow;
