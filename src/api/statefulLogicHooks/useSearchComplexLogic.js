import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import useSelectors from "../../redux/useSelectors";
import {setData} from "../../redux/homeSlice";
import {setTotalResults} from "../../redux/settingsSlice";
import useSearchComplexQuery from "../reactQueryHooks/useSearchComplexQuery";

const useSearchComplexLogic = () => {
	const [yearState, setYearState] = useState("");
	const [castState, setCastState] = useState("");

	const dispatch = useDispatch();

	const {results} = useSelectors();
	const {
		dataSearchComplex,
		refetchSearchComplex,
		isFetchingSearchComplex,
		errorSearchComplex,
		fetchNextPageSearchComplex,
	} = useSearchComplexQuery();

	useEffect(() => {
		if (results === "complex" && dataSearchComplex) {
			dispatch(setTotalResults(dataSearchComplex));
			dispatch(setData(dataSearchComplex));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSearchComplex]);

	return {
		refetchSearchComplex,
		isFetchingSearchComplex,
		errorSearchComplex,
		dataSearchComplex,
		yearState,
		castState,
		setYearState,
		setCastState,
		fetchNextPageSearchComplex,
	};
};

export default useSearchComplexLogic;
