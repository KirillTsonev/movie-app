import {headers, accountID} from "../../constants";

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

export default postToCollection;
