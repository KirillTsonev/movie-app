import {useState} from "react";

const useCheckBoxes = (fn) => {
	const [showGenres, setShowGenres] = useState(false);
	const [selectedGenres, setSelectedGenres] = useState("");
	const [checks, setChecks] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);

	function handleCheckGenre(e, index) {
		if (e.target.checked) {
			const newChecks = [...checks];
			newChecks[index] = true;
			setChecks(newChecks);

			setSelectedGenres([...new Set([...selectedGenres, e.target.value])]);
		} else {
			const newChecks = [...checks];
			newChecks[index] = false;
			setChecks(newChecks);

			setSelectedGenres(selectedGenres.filter((a) => a !== e.target.value));
		}
	}

	function handleGenres() {
		setShowGenres(false);

		fn(selectedGenres);
	}

	return {showGenres, setShowGenres, handleCheckGenre, handleGenres, selectedGenres, checks, setChecks};
};

export default useCheckBoxes;
