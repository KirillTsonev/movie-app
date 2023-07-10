import {rest} from "msw";
import {setupServer} from "msw/node";

import {accountID} from "../constants";

const handlers = [
	//https://api.themoviedb.org/3/account/20110352/favorite/movies
	//https://api.themoviedb.org/3/account/20110352/watchlist/movies
	// https://api.themoviedb.org/3/account/20110352/rated/movies
	rest.get("https://moviesdatabase.p.rapidapi.com/titles/utils/lists", (req, res, ctx) => {
		return res(
			ctx.json({
				results: [
					"most_pop_movies",
					"most_pop_series",
					"top_boxoffice_200",
					"top_boxoffice_last_weekend_10",
					"top_rated_250",
					"top_rated_english_250",
					"top_rated_lowest_100",
					"top_rated_series_250",
				],
			})
		);
	}),
];

export const server = setupServer(...handlers);
