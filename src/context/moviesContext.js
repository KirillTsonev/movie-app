import {createContext, useState} from "react";

import usePagination from "../api/usePagination";

const MoviesContext = createContext([]);

const MoviesProvider = ({children}) => {
	const [movies, setMovies] = useState([]);
	const [data, setData] = useState([]);
	const [results, setResults] = useState("all");

	const {paginationIndex, paginate} = usePagination({data, setMovies, movies});

	return (
		<MoviesContext.Provider
			value={{movies, setMovies, data, setData, paginate, paginationIndex, results, setResults}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

export {MoviesContext, MoviesProvider};
