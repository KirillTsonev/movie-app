import {headers} from "../../constants";

async function fetchSimpleSearch(num, title) {
	const options = {
		method: "GET",
		headers,
	};

	return fetch(
		`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=` + num,
		options
	).then((res) => res.json());
}

export default fetchSimpleSearch;
