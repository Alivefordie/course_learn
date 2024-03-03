import React, { useEffect } from "react";
import MiniCourse from "./MiniCourse";

const Common = ({ data }) => {
	useEffect(() => {
		console.log("Common", data);
	});

	return (
		<div>
			{data.slice(3).map((item, i) => (
				<MiniCourse key={i} course={item} />
			))}
		</div>
	);
};

export default Common;
