import {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";

import {headers} from "../constants";
import {setDetails} from "../redux/collectionsSlice";

const useFetchDetails = () => {
	const [id, setId] = useState();

	const dispatch = useDispatch();

	const {
		data: dataDetails,
		refetch: refetchDetails,
		isFetching: isFetchingDetails,
	} = useQuery({
		queryKey: ["fetchDetails", id],
		queryFn: () => fetchDetails(id),
		enabled: false,
	});

	useEffect(() => {
		if (dataDetails) {
			dispatch(setDetails(dataDetails));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataDetails]);

	useEffect(() => {
		if (id) {
			refetchDetails();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	async function fetchDetails(id) {
		const options = {
			method: "GET",
			headers,
		};

		return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options).then((response) =>
			response.json()
		);
	}
	return {refetchDetails, setId, isFetchingDetails};
};

export default useFetchDetails;
