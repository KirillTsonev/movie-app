import {headers} from "../../constants";

async function fetchGenres() {
	const options = {
		method: "GET",
		headers,
	};

	return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options).then((res) => res.json());
}

export default fetchGenres;
