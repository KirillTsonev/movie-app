import {useInfiniteQuery} from "react-query";

import fetchPlayingNow from "../fetches/fetchPlayingNow";
import useSelectors from "../../redux/useSelectors";

const usePlayingNowQuery = () => {
	const {results} = useSelectors();

	const {
		isFetching: isFetchingPlaying,
		error: errorPlaying,
		data: dataPlaying,
		refetch: refetchPlaying,
		fetchNextPage: fetchNextPagePlaying,
		isSuccess: isSuccessPlaying,
	} = useInfiniteQuery({
		queryKey: ["playingNow", results],
		queryFn: ({pageParam = 1}) => fetchPlayingNow(pageParam),
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
		},
		keepPreviousData: true,
		enabled: false,
		cacheTime: 0,
	});

	return {isFetchingPlaying, errorPlaying, dataPlaying, refetchPlaying, fetchNextPagePlaying, isSuccessPlaying};
};

export default usePlayingNowQuery;
