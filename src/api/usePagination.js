import {useEffect, useState} from "react";

const usePagination = ({data, setMovies, movies}) => {
	const [paginationSlice, setPaginationSlice] = useState(10);
	const [paginationIndex, setPaginationIndex] = useState(1);

	useEffect(() => {
		if (paginationSlice === 10) {
			setMovies(data.slice(0, 10));
		} else {
			setMovies([...new Set([...movies, ...data])].slice(0, paginationSlice));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, paginationSlice]);

	function paginate() {
		if ((movies.length / 10) % 2 === 0) {
			setPaginationIndex(paginationIndex + 1);
		}

		setPaginationSlice(paginationSlice + 10);
	}

	return {paginate, paginationIndex, paginationSlice};
};

export default usePagination;
