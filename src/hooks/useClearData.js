import {useDispatch} from "react-redux";

import {resetQueries, setResults} from "../redux/queriesSlice";
import {resetHomeState} from "../redux/homeSlice";
import {resetSettings} from "../redux/settingsSlice";

const useClearData = () => {
	const dispatch = useDispatch();

	async function clearData(string, refetch) {
		await dispatch(resetQueries());
		await dispatch(resetHomeState());
		await dispatch(resetSettings());
		await dispatch(setResults(string));

		await refetch();
	}

	return {clearData};
};

export default useClearData;
