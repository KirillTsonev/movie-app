import {useQuery} from "react-query";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import {setData} from "../redux/homeSlice";
import {headers} from "../constants";
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
	const location = useLocation();

	useEffect(() => {
		if (results === "all") {
			refetchPlaying();
		}

		if (location.pathname === "/") {
			clearSearch("all");
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
			headers,
		};

		return fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=` + num, options).then((res) =>
			res.json()
		);
	}

	async function clearSearch(string) {
		dispatch(resetQueries());
		dispatch(resetHomeState());
		dispatch(resetSettings());
		await dispatch(setResults(string));

		refetchPlaying();
	}

	return {isLoadingPlaying, errorPlaying, refetchPlaying, clearSearch};
};

export default useGetPlayingNow;
