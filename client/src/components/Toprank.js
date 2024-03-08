import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import MiniCourse from "./MiniCourse";

const Toprank = ({ data }) => {
	useEffect(() => {
		// console.log("Toprank", data);
	}, [data]);

	return (
		<div > 
			{data.slice(0, 3).map((item, i) => (
				<MiniCourse key={i} course={item}  />
			))}
		</div>
	);
};

export default Toprank;
