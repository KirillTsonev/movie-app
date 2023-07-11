import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setGenres} from "../redux/queriesSlice";

const useCheckBoxes = () => {
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [checks, setChecks] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		const arr = [];

		for (let i = 0; i < 19; i++) {
			arr.push(false);
		}

		setChecks(arr);
	}, []);

	function handleCheckGenre(e, index) {
		if (e.target.checked) {
			const newChecks = [...checks];
			newChecks[index] = true;
			setChecks(newChecks);

			setSelectedGenres([...new Set([...selectedGenres, e.target.value])]);
			dispatch(setGenres([...new Set([...selectedGenres, e.target.value])]));
		} else {
			const newChecks = [...checks];
			newChecks[index] = false;
			setChecks(newChecks);

			setSelectedGenres(selectedGenres.filter((a) => a !== e.target.value));
			dispatch(setGenres(selectedGenres.filter((a) => a !== e.target.value)));
		}
	}

	return {handleCheckGenre, selectedGenres, setSelectedGenres, checks, setChecks};
};

export default useCheckBoxes;
