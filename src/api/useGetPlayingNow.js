import {useQuery} from "react-query";
import {useContext} from "react";

import {MoviesContext} from "../context/moviesContext";
import {apiAuthorization} from "../constants";
import {useRef, useState, useEffect} from "react";

const useGetPlayingNow = () => {
	const [paginationNum, setPaginationNum] = useState(10);

	const {movies, setMovies} = useContext(MoviesContext);

	const paginationLinkNum = useRef(1);

	const {isLoading, error, data, refetch} = useQuery({
		queryKey: ["playingNow"],
		queryFn: () => fetchMovies().then((res) => res.json()),
	});

	useEffect(() => {
		if (data) {
			if (paginationNum === 10) {
				setMovies(data.results.slice(0, 10));
			} else {
				setMovies([...new Set([...movies, ...data.results])].slice(0, paginationNum));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, paginationNum]);

	function handlePaginate() {
		if ((movies.length / 10) % 2 === 0) {
			paginationLinkNum.current++;

			refetch();
		}

		setPaginationNum(paginationNum + 10);
	}

	function fetchMovies() {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: apiAuthorization,
			},
		};

		return fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${paginationLinkNum.current}`,
			options
		);
	}

	return {isLoading, error, movies, handlePaginate, data, setMovies};
};

export default useGetPlayingNow;
