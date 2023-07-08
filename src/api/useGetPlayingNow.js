import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setData} from "../redux/homeSlice";
import {apiAuthorization} from "../constants";
import useSelectors from "../redux/useSelectors";

const useGetPlayingNow = () => {
	const [paginationIndex, setPaginationIndex] = useState(1);

	const {results, data} = useSelectors();
	const {
		isLoading: isLoadingPlaying,
		error: errorPlaying,
		data: dataPlaying,
	} = useQuery({
		queryKey: ["playingNow", paginationIndex],
		queryFn: () => fetchMovies(paginationIndex).then((res) => res.json()),
		keepPreviousData: true,
		enabled: results === "all" ? true : false,
		cacheTime: 0,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (results === "all") {
			if (dataPlaying) {
				dispatch(setData([...new Set([...data, ...dataPlaying.results])]));

				if (paginationIndex < 5) {
					setPaginationIndex(paginationIndex + 1);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataPlaying, paginationIndex]);

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

	return {isLoadingPlaying, errorPlaying, setPaginationIndex};
};

export default useGetPlayingNow;
