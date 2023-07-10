import fetchCast from "./fetchCast";

async function createComplexLink({year, cast, genres, num}) {
	let link =
		"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" + num;

	if (year) {
		link += `&primary_release_year=${year}&sort_by=popularity.desc`;
	} else {
		link += "&sort_by=popularity.desc";
	}

	if (cast) {
		const castForFetch = cast.split(",").map((a) => a.trim());

		let data = await Promise.all(
			castForFetch.map(async (a) => {
				return await fetchCast(a);
			})
		);

		link += `&with_cast=${data.join(",")}`;
	}

	if (genres) {
		link += `&with_genres=${genres.join(",")}`;
	}

	return link;
}

export default createComplexLink;
