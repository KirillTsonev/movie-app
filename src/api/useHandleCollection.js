import {useMutation} from "react-query";

import {headers, accountID} from "../constants";

import useFetchLists from "./useFetchLists";

const useHandleCollection = () => {
	const {refetchLists} = useFetchLists();

	const addToCollection = useMutation({
		mutationFn: ({id, key, bool}) => postToCollection({id, key, bool}),
		onSuccess: refetchLists,
	});

	async function postToCollection({id, key, bool}) {
		const options = {
			method: "POST",
			headers: {
				...headers,
				"content-type": "application/json",
			},
			body: JSON.stringify({
				media_type: "movie",
				media_id: id,
				[key]: bool,
			}),
		};

		return fetch(`https://api.themoviedb.org/3/account/${accountID}/${key}`, options).then((res) => res.json());
	}

	return {addToCollection};
};

export default useHandleCollection;
