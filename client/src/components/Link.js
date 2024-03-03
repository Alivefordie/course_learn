import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";

const Specific = () => {
	const { item } = useParams();

	useEffect(() => {
		console.log("item", item);
	}, [item]);

	const Like = async () => {
		try {
			const response = await ax.get(`${conf.apiUrlPrefix}/courses/${item}`);
			console.log(response.data);
		} catch (error) {
			console.log("Failed to confirm:", error);
		}
	};

	return (
		<div>
			<div>
				<Button onClick={Like} variant="outline-dark">
					ลงเรียน
				</Button>
			</div>
		</div>
	);
};

export default Specific;
