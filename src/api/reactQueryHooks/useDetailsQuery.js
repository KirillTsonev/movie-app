import {useQuery} from "react-query";

import fetchDetails from "../fetches/fetchDetails";

const useDetailsQuery = (id) => {
	const {
		data: dataDetails,
		refetch: refetchDetails,
		isFetching: isFetchingDetails,
	} = useQuery({
		queryKey: ["fetchDetails", id],
		queryFn: () => fetchDetails(id),
		enabled: false,
	});

	return {dataDetails, refetchDetails, isFetchingDetails};
};

export default useDetailsQuery;
