import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import useClearData from "../../hooks/useClearData";
import useSelectors from "../../redux/useSelectors";
import usePlayingNowQuery from "../reactQueryHooks/usePlayingNowQuery";
import {setData} from "../../redux/homeSlice";
import {setTotalResults} from "../../redux/settingsSlice";

const useGetPlayingNow = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const {results} = useSelectors();
	const {clearData} = useClearData();
	const {dataPlaying, refetchPlaying, isFetchingPlaying, errorPlaying, fetchNextPagePlaying, isSuccessPlaying} =
		usePlayingNowQuery();

	useEffect(() => {
		if (results === "all" && dataPlaying) {
			dispatch(setTotalResults(dataPlaying));
			dispatch(setData(dataPlaying));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataPlaying]);

	useEffect(() => {
		if (location.pathname === "/") {
			clearData("all", refetchPlaying);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {isFetchingPlaying, errorPlaying, refetchPlaying, fetchNextPagePlaying, isSuccessPlaying};
};

export default useGetPlayingNow;
