import {headers, accountID} from "../../constants";

async function fetchLists(num, collection) {
	const options = {
		method: "GET",
		headers,
	};

	return fetch(
		`https://api.themoviedb.org/3/account/${accountID}/${collection}/movies?language=en-US&page=${num}&sort_by=created_at.asc`,
		options
	).then((response) => response.json());
}

export default fetchLists;
