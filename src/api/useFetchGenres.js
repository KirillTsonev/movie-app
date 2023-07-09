import {useEffect} from "react";
import {useQuery} from "react-query";

import {headers} from "../constants";

const useFetchGenres = () => {
	const {data: dataGenres, refetch: refetchGenres} = useQuery({
		queryKey: ["fetchGenres"],
		queryFn: () => fetchGenres(),
		enabled: false,
	});

	useEffect(() => {
		refetchGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchGenres() {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options).then((res) => res.json());
	}

	return {dataGenres};
};

export default useFetchGenres;
