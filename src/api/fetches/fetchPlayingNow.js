import {headers} from "../../constants";

async function fetchPlayingNow(num) {
	const options = {
		method: "GET",
		headers,
	};

	return fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=` + num, options).then((res) =>
		res.json()
	);
}

export default fetchPlayingNow;
