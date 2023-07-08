import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {accountID, headers} from "../constants";
import {setFavorites} from "../redux/collectionsSlice";

import useSelectors from "../redux/useSelectors";

const useFetchLists = () => {
	const [lastPage, setLastPage] = useState();
	const [page, setPage] = useState(1);

	const {favorites} = useSelectors();
	const {
		isLoading: isLoadingLists,
		error: errorLists,
		data: dataLists,
		refetch: refetchLists,
	} = useQuery({
		queryKey: ["fetchLists", page],
		queryFn: () => fetchLists(page),
		// keepPreviousData: true,
		// enabled: false,
		// cacheTime: 0,
	});

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	refetchLists();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	useEffect(() => {
		if (dataLists) {
			setLastPage(dataLists.total_pages);

			// console.log(dataLists.results);
			dispatch(setFavorites([...new Set([...favorites, ...dataLists.results.map((a) => a.id)])]));

			if (page < lastPage) {
				setPage(page + 1);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataLists, page, lastPage]);

	async function fetchLists(num) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(
			`https://api.themoviedb.org/3/account/${accountID}/favorite/movies?language=en-US&page=${num}&sort_by=created_at.asc`,
			options
		).then((response) => response.json());
	}

	return {refetchLists};
};

export default useFetchLists;
