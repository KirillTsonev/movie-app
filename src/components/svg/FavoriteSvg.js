import React, {useState} from "react";
import {Button, Tooltip} from "@chakra-ui/react";

import useSelectors from "../../redux/useSelectors";
import useHandleCollection from "../../api/reactQueryHooks/useCollectionsMutation";

const FavoriteSvg = ({id}) => {
	const [hover, setHover] = useState(false);

	const {favorite} = useSelectors();
	const {handleCollectionFavorite} = useHandleCollection();

	return (
		<Tooltip
			hasArrow
			label={favorite.includes(id) ? "Remove from favorites" : "Add to favorites"}
		>
			<Button
				borderRadius="100%"
				height="60px"
				width="60px"
				m="0"
				p="0"
				_hover="null"
				bg="none"
			>
				<svg
					height="60px"
					width="60px"
					viewBox="0 0 512 512"
					cursor="pointer"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onClick={() => handleCollectionFavorite(id)}
				>
					<circle
						data-testid="favoriteTest"
						style={
							favorite.includes(id) && !hover
								? {fill: "#ff6a00", transition: "all .4s"}
								: favorite.includes(id) && hover
								? {fill: "#eb284d", transition: "all .4s"}
								: hover
								? {fill: "#17b824", transition: "all .4s"}
								: {fill: "#324A5E", transition: "all .4s"}
						}
						cx="256"
						cy="256"
						r="256"
					/>
					<path
						style={
							favorite.includes(id) && !hover
								? {fill: "#b15513", transition: "all .4s"}
								: favorite.includes(id) && hover
								? {fill: "#932c00", transition: "all .4s"}
								: hover
								? {fill: "#006400", transition: "all .4s"}
								: {fill: "#202c3b", transition: "all .4s"}
						}
						d="M511.746,267.092c-4.352,102.197-68.631,188.881-158.593,225.816L256,395.756l126.632-257.778
L511.746,267.092z"
					/>
					<path
						style={{fill: "#FF8C8A"}}
						d="M256,190.427c0-40.964-33.208-74.183-74.172-74.183c-40.976,0-74.183,33.219-74.183,74.183
c0,98.815,112.504,143.034,148.355,205.34c35.862-62.306,148.367-106.525,148.367-205.34c0-40.964-33.219-74.183-74.183-74.183
S256,149.463,256,190.427z"
					/>
					<path
						style={{fill: "#FA7876"}}
						d="M249.906,386.326c2.216,3.105,4.259,6.244,6.094,9.442c35.862-62.306,148.367-106.525,148.367-205.34
c0-21.215-8.911-40.341-23.189-53.869c10.065,12.662,16.079,28.683,16.079,46.112C397.257,280.597,286.807,324.908,249.906,386.326z
"
					/>
				</svg>
			</Button>
		</Tooltip>
	);
};

export default FavoriteSvg;
