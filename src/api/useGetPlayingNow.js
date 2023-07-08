import {useQuery} from "react-query";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {apiAuthorization} from "../constants";
import {setTotalResults} from "../redux/settingsSlice";
import {resetQueries, setResults} from "../redux/queriesSlice";
import {resetSettings} from "../redux/settingsSlice";
import {resetHomeState} from "../redux/homeSlice";
import useSelectors from "../redux/useSelectors";

const useGetPlayingNow = () => {
	const {results, data, paginationIndex} = useSelectors();
	const {
		isLoading: isLoadingPlaying,
		error: errorPlaying,
		data: dataPlaying,
		refetch: refetchPlaying,
	} = useQuery({
		queryKey: ["playingNow", results],
		queryFn: () => fetchMovies(paginationIndex),
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "all") {
			refetchPlaying();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (results === "all" && dataPlaying) {
			dispatch(setData([...new Set([...data, ...dataPlaying.results])]));
			dispatch(setTotalResults(dataPlaying.total_results));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataPlaying]);

	async function fetchMovies(num) {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		return fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=` + num, options).then((res) =>
			res.json()
		);
	}

	async function clearSearch() {
		dispatch(resetQueries());
		dispatch(resetHomeState());
		dispatch(resetSettings());
		await dispatch(setResults("all"));

		refetchPlaying();
	}

	return {isLoadingPlaying, errorPlaying, refetchPlaying, clearSearch};
};

export default useGetPlayingNow;
