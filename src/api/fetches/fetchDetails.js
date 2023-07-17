import {headers} from "../../constants";

async function fetchDetails(id) {
	const options = {
		method: "GET",
		headers,
	};

	return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options).then((response) => response.json());
}

export default fetchDetails;
