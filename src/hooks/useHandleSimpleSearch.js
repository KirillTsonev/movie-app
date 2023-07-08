import {useDispatch} from "react-redux";

import useSearchBarSimple from "../api/useSearchBarSimple";
import {resetHomeState} from "../redux/homeSlice";
import {setSimpleQueries} from "../redux/queriesSlice";
import {setSearched} from "../redux/settingsSlice";

const useHandleSimpleSearch = () => {
	const {refetchSearchSimple, searchString, setSearchString} = useSearchBarSimple();

	const dispatch = useDispatch();

	function handleInput(e) {
		setSearchString(e.target.value);
	}

	function handleSearch(e) {
		e.preventDefault();

		if (searchString) {
			dispatch(setSearched(true));

			dispatch(resetHomeState());
			dispatch(setSimpleQueries(searchString));

			refetchSearchSimple();
		}
	}

	return {handleInput, handleSearch};
};

export default useHandleSimpleSearch;
