import {useInfiniteQuery} from "react-query";

import fetchLists from "../fetches/fetchCollections";
import useSelectors from "../../redux/useSelectors";

const useCollectionsQuery = (currentCollection) => {
	const {results} = useSelectors();
	const {
		isFetching: isFetchingCollections,
		isSuccess: isSuccessCollections,
		error: errorCollections,
		data: dataCollections,
		refetch: refetchCollections,
		fetchNextPage: fetchNextPageCollections,
	} = useInfiniteQuery({
		queryKey: ["fetchCollections", results],
		queryFn: ({pageParam = 1}) => fetchLists(pageParam, currentCollection),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	return {
		dataCollections,
		isFetchingCollections,
		isSuccessCollections,
		errorCollections,
		refetchCollections,
		fetchNextPageCollections,
	};
};

export default useCollectionsQuery;
