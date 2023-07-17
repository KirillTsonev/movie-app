import {useInfiniteQuery} from "react-query";

import fetchSimpleSearch from "../fetches/fetchSimpleSearch";
import useSelectors from "../../redux/useSelectors";

const useSearchSimpleQuery = () => {
	const {results, title} = useSelectors();
	const {
		isFetching: isFetchingSearchSimple,
		error: errorSearchSimple,
		data: dataSearchSimple,
		refetch: refetchSearchSimple,
		fetchNextPage: fetchNextPageSearchSimple,
	} = useInfiniteQuery({
		queryKey: ["simpleSearch", results],
		queryFn: ({pageParam = 1}) => fetchSimpleSearch(pageParam, title),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	return {dataSearchSimple, isFetchingSearchSimple, errorSearchSimple, refetchSearchSimple, fetchNextPageSearchSimple};
};

export default useSearchSimpleQuery;
