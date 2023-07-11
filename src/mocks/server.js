import {rest} from "msw";
import {setupServer} from "msw/node";

import {accountID} from "../constants";

const handlers = [
	rest.get(`https://api.themoviedb.org/3/account/${accountID}/favorite/movies`, (req, res, ctx) => {
		return res(
			ctx.json({
				page: 1,
				results: [
					{
						backdrop_path: "/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg",
						id: 455476,
						original_title: "Knights of the Zodiac",
					},
				],
				total_pages: 1,
				total_results: 1,
			})
		);
	}),
	rest.get(`https://api.themoviedb.org/3/account/${accountID}/watchlist/movies`, (req, res, ctx) => {
		return res(
			ctx.json({
				page: 1,
				results: [
					{
						backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
						id: 569094,
						original_title: "Spider-Man: Across the Spider-Verse",
					},
				],
				total_pages: 1,
				total_results: 1,
			})
		);
	}),
	rest.get(`https://api.themoviedb.org/3/account/${accountID}/rated/movies`, (req, res, ctx) => {
		return res(
			ctx.json({
				page: 1,
				results: [
					{
						backdrop_path: "/woJbg7ZqidhpvqFGGMRhWQNoxwa.jpg",
						id: 667538,
						original_title: "Transformers: Rise of the Beasts",
					},
				],
				total_pages: 1,
				total_results: 1,
			})
		);
	}),
	rest.get(`https://api.themoviedb.org/3/genre/movie/list`, (req, res, ctx) => {
		return res(
			ctx.json({
				genres: [
					{
						id: 28,
						name: "Action",
					},
					{
						id: 12,
						name: "Adventure",
					},
					// {
					// 	id: 16,
					// 	name: "Animation",
					// },
					// {
					// 	id: 35,
					// 	name: "Comedy",
					// },
					// {
					// 	id: 80,
					// 	name: "Crime",
					// },
					// {
					// 	id: 99,
					// 	name: "Documentary",
					// },
					// {
					// 	id: 18,
					// 	name: "Drama",
					// },
					// {
					// 	id: 10751,
					// 	name: "Family",
					// },
					// {
					// 	id: 14,
					// 	name: "Fantasy",
					// },
					// {
					// 	id: 36,
					// 	name: "History",
					// },
					// {
					// 	id: 27,
					// 	name: "Horror",
					// },
					// {
					// 	id: 10402,
					// 	name: "Music",
					// },
					// {
					// 	id: 9648,
					// 	name: "Mystery",
					// },
					// {
					// 	id: 10749,
					// 	name: "Romance",
					// },
					// {
					// 	id: 878,
					// 	name: "Science Fiction",
					// },
					// {
					// 	id: 10770,
					// 	name: "TV Movie",
					// },
					// {
					// 	id: 53,
					// 	name: "Thriller",
					// },
					// {
					// 	id: 10752,
					// 	name: "War",
					// },
					// {
					// 	id: 37,
					// 	name: "Western",
					// },
				],
			})
		);
	}),
	rest.get(`https://api.themoviedb.org/3/movie/now_playing`, (req, res, ctx) => {
		return res(
			ctx.json({
				dates: {
					maximum: "2023-07-08",
					minimum: "2023-05-21",
				},
				page: 1,
				results: [
					{
						backdrop_path: "/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg",
						id: 455476,
						original_title: "Knights of the Zodiac",
					},
					{
						backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
						id: 569094,
						original_title: "Spider-Man: Across the Spider-Verse",
					},
					{
						backdrop_path: "/woJbg7ZqidhpvqFGGMRhWQNoxwa.jpg",
						id: 667538,
						original_title: "Transformers: Rise of the Beasts",
					},
					{
						backdrop_path: "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
						id: 502356,
						original_title: "The Super Mario Bros. Movie",
					},
					{
						backdrop_path: "/euO884625eFLfKLoc0MtFs5QiOS.jpg",
						id: 1070802,
						original_title: "Confidential Informant",
					},
					{
						backdrop_path: "/cSYLX73WskxCgvpN3MtRkYUSj1T.jpg",
						id: 976573,
						original_title: "Elemental",
					},
					{
						backdrop_path: "/wRxLAw4l17LqiFcPLkobriPTZAw.jpg",
						id: 697843,
						original_title: "Extraction 2",
					},
					{
						backdrop_path: "/aO6hDsqTIAtQFUBoPWklmPFsSTW.jpg",
						id: 614479,
						original_title: "Insidious: The Red Door",
					},
					{
						backdrop_path: "/lQzSMhkAl90iXPirjnLbRHkxApC.jpg",
						id: 917007,
						original_title: "Bed Rest",
					},
					{
						backdrop_path: "/fCw8CVgII6W7ALbIh0SgXax3Hsj.jpg",
						id: 447277,
						original_title: "The Little Mermaid",
					},
					{
						backdrop_path: "/osnvZffaZymubHiBkOsIFd8Y3Re.jpg",
						id: 986070,
						original_title: "The Wrath of Becky",
					},
					{
						backdrop_path: "/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
						id: 298618,
						original_title: "The Flash",
					},
					{
						backdrop_path: "/84cS9oEm33jD05T0p39TbwADY8.jpg",
						id: 678512,
						original_title: "Sound of Freedom",
					},
					{
						backdrop_path: "/9t0tJXcOdWwwxmGTk112HGDaT0Q.jpg",
						id: 890771,
						original_title: "The Black Demon",
					},
					{
						backdrop_path: "/qe0oK0A5ovrlgH39Ga13dxxw9MU.jpg",
						id: 1130818,
						original_title: "Sheroes",
					},
					{
						backdrop_path: "/8FhKnPpql374qyyHAkZDld93IUw.jpg",
						id: 536437,
						original_title: "Hypnotic",
					},
					{
						backdrop_path: "/eTvN54pd83TrSEOz6wbsXEJktCV.jpg",
						id: 882569,
						original_title: "Guy Ritchie's The Covenant",
					},
					{
						backdrop_path: "/o9bbojtrrpl0yriiTmzC3Lp3OhA.jpg",
						id: 840326,
						original_title: "Sisu",
					},
					{
						backdrop_path: "/4QpKxH614YFIsmiIBVUbsnG2H8w.jpg",
						id: 961323,
						original_title: "Nimona",
					},
					{
						backdrop_path: "/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg",
						id: 335977,
						original_title: "Indiana Jones and the Dial of Destiny",
					},
				],
				total_pages: 86,
				total_results: 1707,
			})
		);
	}),
	rest.get(`https://api.themoviedb.org/3/movie/455476`, (req, res, ctx) => {
		return res(
			ctx.json({
				backdrop_path: "/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg",
				genres: [
					{
						id: 14,
						name: "Fantasy",
					},
					{
						id: 28,
						name: "Action",
					},
					{
						id: 12,
						name: "Adventure",
					},
				],
				id: 455476,
				original_title: "Knights of the Zodiac",
				overview:
					"When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?",
				poster_path: "/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg",
				release_date: "2023-04-27",
				tagline: "Go beyond your destiny.",
				vote_average: 6.523,
				vote_count: 386,
			})
		);
	}),
	rest.get(`https://api.themoviedb.org/3/search/person`, (req, res, ctx) => {
		return res(
			ctx.json({
				page: 1,
				results: [
					{
						id: 1158,
					},
				],
				total_pages: 1,
				total_results: 13,
			})
		);
	}),
	rest.post(`https://api.themoviedb.org/3/account/${accountID}/favorite`, (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				status_code: 1,
				status_message: "Success.",
			})
		);
	}),
	rest.post(`https://api.themoviedb.org/3/account/${accountID}/watchlist`, (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				status_code: 1,
				status_message: "Success.",
			})
		);
	}),
	rest.post(`https://api.themoviedb.org/3/movie/455476/rating`, (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				status_code: 1,
				status_message: "Success.",
			})
		);
	}),
	rest.get("https://api.themoviedb.org/3/search/movie", (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				status_code: 1,
				status_message: "Success.",
			})
		);
	}),
];

export const server = setupServer(...handlers);
