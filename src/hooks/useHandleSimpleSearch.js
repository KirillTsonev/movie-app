import {useDispatch} from "react-redux";

import useSearchBarSimple from "../api/useSearchBarSimple";
import {resetHomeState} from "../redux/homeSlice";
import {setSimpleQueries, resetQueries} from "../redux/queriesSlice";
import {setSearched} from "../redux/settingsSlice";

const useHandleSimpleSearch = () => {
	const dispatch = useDispatch();

	const {refetchSearchSimple} = useSearchBarSimple();

	async function handleSearch({e, titleState, setTitleState}) {
		e.preventDefault();

		if (titleState) {
			await dispatch(resetQueries());
			await dispatch(resetHomeState());
			await dispatch(setSimpleQueries(titleState));

			dispatch(setSearched(true));

			refetchSearchSimple();

			setTitleState("");
		}
	}

	return {handleSearch};
};

export default useHandleSimpleSearch;
