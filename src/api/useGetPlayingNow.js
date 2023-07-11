import {useInfiniteQuery} from "react-query";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import useClearData from "../hooks/useClearData";
import useSelectors from "../redux/useSelectors";
import {setData} from "../redux/homeSlice";
import {headers} from "../constants";
import {setTotalResults} from "../redux/settingsSlice";

const useGetPlayingNow = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const {results} = useSelectors();
	const {clearData} = useClearData();
	const {
		isFetching: isFetchingPlaying,
		error: errorPlaying,
		data: dataPlaying,
		refetch: refetchPlaying,
		fetchNextPage: fetchNextPagePlaying,
		isSuccess: isSuccessPlaying,
	} = useInfiniteQuery({
		queryKey: ["playingNow", results],
		queryFn: ({pageParam = 1}) => fetchMovies(pageParam),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	useEffect(() => {
		if (results === "all" && dataPlaying) {
			dispatch(setTotalResults(dataPlaying));
			dispatch(setData(dataPlaying));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataPlaying]);

	useEffect(() => {
		if (location.pathname === "/") {
			clearData("all", refetchPlaying);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchMovies(num) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=` + num, options).then((res) =>
			res.json()
		);
	}

	return {isFetchingPlaying, errorPlaying, refetchPlaying, fetchNextPagePlaying, isSuccessPlaying};
};

export default useGetPlayingNow;
