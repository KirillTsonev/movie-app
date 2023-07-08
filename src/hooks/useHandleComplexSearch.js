import {useDispatch} from "react-redux";

import useSearchBarComplex from "../api/useSearchBarComplex";
import useCheckBoxes from "./useCheckBoxes";
import {resetQueries, setComplexQueries} from "../redux/queriesSlice";
import {resetHomeState} from "../redux/homeSlice";
import {setSearched} from "../redux/settingsSlice";

const useHandleComplexSearch = () => {
	const {refetchSearchComplex} = useSearchBarComplex();
	const {setSelectedGenres, setChecks, checks} = useCheckBoxes();

	const dispatch = useDispatch();

	async function handleSearch({e, selectedGenres, castState, yearState, setCastState, setYearState}) {
		e.preventDefault();

		if ((yearState >= 1700 && yearState <= 2023) || !!castState || selectedGenres.length > 0) {
			await dispatch(resetQueries());
			await dispatch(resetHomeState());
			await dispatch(setComplexQueries({selectedGenres, castState, yearState}));

			dispatch(setSearched(true));

			refetchSearchComplex();

			setCastState("");
			setYearState("");
			setSelectedGenres([]);
			setChecks(checks.map(() => false));
		}
	}

	return {handleSearch};
};

export default useHandleComplexSearch;
