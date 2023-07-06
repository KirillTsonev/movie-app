import {useState} from "react";

const useCheckBoxes = (fn) => {
	const [showGenres, setShowGenres] = useState(false);
	const [selectedGenres, setSelectedGenres] = useState([]);

	function handleCheckGenre(e) {
		if (e.target.checked) {
			setSelectedGenres([...new Set([...selectedGenres, e.target.value])]);
		} else {
			setSelectedGenres(selectedGenres.filter((a) => a !== e.target.value));
		}
	}

	function handleGenres() {
		setShowGenres(false);

		fn(selectedGenres);
	}

	return {showGenres, setShowGenres, handleCheckGenre, handleGenres};
};

export default useCheckBoxes;
