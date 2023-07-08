import {useDispatch} from "react-redux";

import useSearchBarComplex from "../api/useSearchBarComplex";
import useSelectors from "../redux/useSelectors";
import useCheckBoxes from "./useCheckBoxes";
import {setResults, resetHomeState} from "../redux/homeSlice";

const useHandleComplexSearch = (fn) => {
	const {refetchSearchComplex} = useSearchBarComplex();
	const {year, cast} = useSelectors();
	const {selectedGenres, setSelectedGenres, checks, setChecks} = useCheckBoxes();

	const dispatch = useDispatch();

	function handleSearch(e) {
		e.preventDefault();

		if (!!year || !!cast || !!selectedGenres) {
			fn(true);

			dispatch(resetHomeState());
			dispatch(setResults("complex"));

			refetchSearchComplex();

			setSelectedGenres("");
			setChecks(checks.map((a) => false));
		}
	}

	return {handleSearch};
};

export default useHandleComplexSearch;
