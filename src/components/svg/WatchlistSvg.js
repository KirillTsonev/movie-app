import React, {useState} from "react";

import useSelectors from "../../redux/useSelectors";
import useHandleCollection from "../../api/useHandleCollection";

const WatchlistSvg = ({id}) => {
	const [hover, setHover] = useState(false);

	const {watchlist} = useSelectors();
	const {handleCollectionWatchlist} = useHandleCollection();

	return (
		<svg
			height="60px"
			width="60px"
			viewBox="0 0 512 512"
			cursor="pointer"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => handleCollectionWatchlist(id)}
		>
			<circle
				style={
					watchlist.includes(id) && !hover
						? {fill: "#ff6a00", transition: "all .4s"}
						: watchlist.includes(id) && hover
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
					watchlist.includes(id) && !hover
						? {fill: "#b15513", transition: "all .4s"}
						: watchlist.includes(id) && hover
						? {fill: "#932c00", transition: "all .4s"}
						: hover
						? {fill: "#006400", transition: "all .4s"}
						: {fill: "#202c3b", transition: "all .4s"}
				}
				d="M502.205,326.366L431.838,256l-270.043,14.689l-53.657,20.004l214.607,212.497
	C409.271,479.884,477.668,412.379,502.205,326.366z"
			/>
			<path
				style={{fill: "#324A5E"}}
				d="M256,162.306c-75.138,0-140.738,37.685-175.838,93.694c35.1,56.008,100.7,93.694,175.838,93.694
	S396.738,312.01,431.838,256C396.738,199.992,331.138,162.306,256,162.306z"
			/>
			<path
				style={{fill: "#2B3B4E"}}
				d="M256,162.306c-0.193,0-0.383,0.009-0.574,0.009v187.37c0.193,0,0.383,0.009,0.574,0.009
	c75.138,0,140.738-37.685,175.838-93.694C396.738,199.992,331.138,162.306,256,162.306z"
			/>
			<path
				style={{fill: "#E6F3FF"}}
				d="M256,184.065c-60.406,0-113.142,28.934-141.36,71.935c28.219,43.001,80.955,71.935,141.36,71.935
	S369.142,299.001,397.36,256C369.142,212.999,316.406,184.065,256,184.065z"
			/>
			<path
				style={{fill: "#CFDBE6"}}
				d="M256,184.065c-0.193,0-0.383,0.009-0.574,0.009v143.853c0.193,0,0.383,0.009,0.574,0.009
	c60.406,0,113.142-28.934,141.36-71.935C369.142,212.999,316.406,184.065,256,184.065z"
			/>
			<circle
				style={{fill: "#84DBFF"}}
				cx="256"
				cy="256"
				r="65.508"
			/>
			<path
				style={{fill: "#31BAFD"}}
				d="M256,190.492c-0.193,0-0.383,0.012-0.576,0.014v130.988c0.193,0.002,0.383,0.014,0.576,0.014
	c36.18,0,65.508-29.329,65.508-65.508S292.18,190.492,256,190.492z"
			/>
			<circle
				style={{fill: "#324A5E"}}
				cx="256"
				cy="256"
				r="21.549"
			/>
			<path
				style={{fill: "#2B3B4E"}}
				d="M256,234.451c-0.195,0-0.383,0.024-0.576,0.029v43.039c0.193,0.005,0.381,0.029,0.576,0.029
	c11.902,0,21.549-9.647,21.549-21.549S267.902,234.451,256,234.451z"
			/>
			<circle
				style={{fill: "#FFFFFF"}}
				cx="243.933"
				cy="237.037"
				r="9.481"
			/>
		</svg>
	);
};

export default WatchlistSvg;
