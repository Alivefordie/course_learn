import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Specific from "../../components/Specific";
import InsNavbar from "../../components/Ins/InsNavbar";
import "../../App.css";
const SpecificCourse = () => {
	const param = useParams();
	const fetch = () => {};
	useEffect(() => {
		console.log(param);
	}, []);
	return (
		<div className="body">
			<InsNavbar />
		</div>
	);
};

export default SpecificCourse;
