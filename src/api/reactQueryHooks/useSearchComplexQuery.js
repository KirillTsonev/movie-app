import {useInfiniteQuery} from "react-query";

import fetchComplexSearch from "../fetches/fetchComplexSearch";
import useSelectors from "../../redux/useSelectors";

const useSearchComplexQuery = () => {
	const {results, genres, year, cast} = useSelectors();
	const {
		isFetching: isFetchingSearchComplex,
		error: errorSearchComplex,
		data: dataSearchComplex,
		refetch: refetchSearchComplex,
		fetchNextPage: fetchNextPageSearchComplex,
	} = useInfiniteQuery({
		queryKey: ["complexSearch", results],
		queryFn: ({pageParam = 1}) => fetchComplexSearch({year, cast, genres, num: pageParam}),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	return {
		isFetchingSearchComplex,
		errorSearchComplex,
		dataSearchComplex,
		refetchSearchComplex,
		fetchNextPageSearchComplex,
	};
};

export default useSearchComplexQuery;
