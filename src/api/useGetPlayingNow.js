import {useQuery} from "react-query";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setData} from "../redux/homeSlice";

import {apiAuthorization} from "../constants";

const useGetPlayingNow = () => {
	const results = useSelector((state) => state.home.results);
	const paginationIndex = useSelector((state) => state.home.paginationIndex);

	const dispatch = useDispatch();

	const {
		isLoading: isLoadingPlaying,
		error: errorPlaying,
		data: dataPlaying,
	} = useQuery({
		queryKey: ["playingNow", paginationIndex],
		queryFn: () => fetchMovies(paginationIndex).then((res) => res.json()),
		keepPreviousData: true,
		enabled: results === "all" ? true : false,
	});

	useEffect(() => {
		if (dataPlaying && results === "all") {
			dispatch(setData(dataPlaying.results));
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

	return {isLoadingPlaying, errorPlaying};
};

export default useGetPlayingNow;
