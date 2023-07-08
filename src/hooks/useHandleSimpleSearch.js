import {useDispatch} from "react-redux";

import useSearchBarSimple from "../api/useSearchBarSimple";
import {setResults, resetHomeState} from "../redux/homeSlice";
import {setTitle} from "../redux/queriesSlice";

const useHandleSimpleSearch = (fn) => {
	const {refetchSearchSimple, searchString, setSearchString} = useSearchBarSimple();

	const dispatch = useDispatch();

	function handleInput(e) {
		setSearchString(e.target.value);

		dispatch(setTitle(e.target.value));
	}

	function handleSearch(e) {
		e.preventDefault();

		if (searchString) {
			fn(true);

			dispatch(resetHomeState());
			dispatch(setResults("simple"));

			refetchSearchSimple();
		}
	}

	return {handleInput, handleSearch};
};

export default useHandleSimpleSearch;
