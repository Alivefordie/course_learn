import React, { useEffect } from "react";
import MiniCourse from "./MiniCourse";

//display search data in common

const Common = ({ data }) => {
	useEffect(() => {
		//console.log("Common", data);
	});

	return (
		<div>
			{data.map((item, i) => (
				<MiniCourse key={i} course={item} />
			))}
		</div>
	);
};

export default Common;
