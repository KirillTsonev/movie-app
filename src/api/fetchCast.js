import {apiAuthorization} from "../constants";

async function fetchCast(actor) {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: apiAuthorization,
		},
	};

	actor = actor.replace(" ", "%20");

	const response = await fetch(
		`https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=en-US&page=1`,
		options
	);

	const result = await response.json();

	return result.results[0].id;
}

export default fetchCast;
