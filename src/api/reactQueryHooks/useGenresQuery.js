import {useEffect} from "react";
import {useQuery} from "react-query";

import fetchGenres from "../fetches/fetchGenres";

const useGenresQuery = () => {
	const {data: dataGenres, refetch: refetchGenres} = useQuery({
		queryKey: ["fetchGenres"],
		queryFn: () => fetchGenres(),
		enabled: false,
	});

	useEffect(() => {
		refetchGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {dataGenres, refetchGenres};
};

export default useGenresQuery;
