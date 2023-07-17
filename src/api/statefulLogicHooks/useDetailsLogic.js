import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {setDetails} from "../../redux/collectionsSlice";
import useDetailsQuery from "../reactQueryHooks/useDetailsQuery";

const useDetailsLogic = () => {
	const [id, setId] = useState();

	const dispatch = useDispatch();

	const {dataDetails, refetchDetails, isFetchingDetails} = useDetailsQuery(id);

	useEffect(() => {
		if (dataDetails) {
			dispatch(setDetails(dataDetails));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataDetails]);

	useEffect(() => {
		if (id) {
			refetchDetails();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {refetchDetails, setId, isFetchingDetails};
};

export default useDetailsLogic;
