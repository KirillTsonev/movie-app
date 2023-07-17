import {headers} from "../../constants";

async function postRating({id, value, method}) {
	const options = {
		method,
		headers: {
			...headers,
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({value}),
	};

	fetch(`https://api.themoviedb.org/3/movie/${id}/rating`, options).then((response) => response.json());
}

export default postRating;
