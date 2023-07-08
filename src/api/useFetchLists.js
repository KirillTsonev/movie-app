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
		onSuccess: handleNextPage,
		// keepPreviousData: true,
		// enabled: false,
		// cacheTime: 0,
	});

	const dispatch = useDispatch();

	function handleNextPage() {
		if (page < lastPage) {
			setPage(page + 1);

			// refetchLists();
		}
	}

	// useEffect(() => {
	// 	refetchLists();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	// 	for (let index = 1; index < lastPage; index++) {
	// 		// setPage(page + 1);
	// 		// console.log(lastPage);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [lastPage, page]);

	useEffect(() => {
		if (dataLists) {
			setLastPage(dataLists.total_pages);

			dispatch(setFavorites([...new Set([...favorites, ...dataLists.results.map((a) => a.id)])]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataLists]);

	async function fetchLists(num) {
		const options = {
			method: "GET",
			headers,
		};

		console.log(num);

		return fetch(
			`https://api.themoviedb.org/3/account/${accountID}/favorite/movies?language=en-US&page=${num}&sort_by=created_at.asc`,
			options
		).then((response) => response.json());
	}

	return {refetchLists};
};

export default useFetchLists;
