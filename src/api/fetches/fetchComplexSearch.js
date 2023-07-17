import helperComplexLink from "./helperComplexLink";
import {headers} from "../../constants";

async function fetchComplexSearch({year, cast, genres, num}) {
	const options = {
		method: "GET",
		headers,
	};

	const link = await helperComplexLink({year, cast, genres, num});

	return fetch(link, options).then((res) => res.json());
}

export default fetchComplexSearch;
