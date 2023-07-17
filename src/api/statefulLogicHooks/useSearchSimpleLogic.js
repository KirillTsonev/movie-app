import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import useSelectors from "../../redux/useSelectors";
import useSearchSimpleQuery from "../reactQueryHooks/useSearchSimpleQuery";
import {setData} from "../../redux/homeSlice";
import {setTotalResults} from "../../redux/settingsSlice";

const useSearchSimpleLogic = () => {
	const [titleState, setTitleState] = useState("");

	const dispatch = useDispatch();

	const {results} = useSelectors();
	const {dataSearchSimple, refetchSearchSimple, isFetchingSearchSimple, errorSearchSimple, fetchNextPageSearchSimple} =
		useSearchSimpleQuery();

	useEffect(() => {
		if (results === "simple" && dataSearchSimple) {
			dispatch(setTotalResults(dataSearchSimple));
			dispatch(setData(dataSearchSimple));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchSimple]);

	return {
		refetchSearchSimple,
		isFetchingSearchSimple,
		errorSearchSimple,
		titleState,
		setTitleState,
		dataSearchSimple,
		fetchNextPageSearchSimple,
	};
};

export default useSearchSimpleLogic;
