import {useQuery} from "react-query";
import {useContext} from "react";
import {useEffect} from "react";

import {MoviesContext} from "../context/moviesContext";
import {apiAuthorization} from "../constants";

const useGetPlayingNow = () => {
	const {setData, paginationIndex, results} = useContext(MoviesContext);

	const {
		isLoading: isLoadingPlaying,
		error: errorPlaying,
		data: dataPlaying,
	} = useQuery({
		queryKey: ["playingNow", paginationIndex],
		queryFn: () => fetchMovies(paginationIndex).then((res) => res.json()),
		keepPreviousData: true,
	});

	useEffect(() => {
		if (dataPlaying && results === "all") {
			setData(dataPlaying.results);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataPlaying]);

	function fetchMovies(num) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		return fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=` + num, options);
	}

	return {isLoadingPlaying, errorPlaying, dataPlaying};
};

export default useGetPlayingNow;
