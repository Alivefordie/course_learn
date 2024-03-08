import React, { useEffect } from "react";
import MiniCourse from "./MiniCourse";

const Newest = ({ data }) => {
	useEffect(() => {
		// console.log("Newest", data);
	});

	return (
		<div>
			{data.map((item, i) => (
				<MiniCourse key={i} course={item} />
			))}
		</div>
	);
};

export default Newest;
