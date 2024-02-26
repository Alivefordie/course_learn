import React, { useEffect, useState } from "react";
import axios from "axios";
import InsNavbar from "../../components/Ins/InsNavbar";
import "../../App.css";
import SmallCourse from "../../components/Ins/SmallCourse";
import { Row } from "react-bootstrap";
const InsSee = () => {
	const [myData, setMyData] = useState([]);
	const fetchData = async () => {
		try {
			const storedJwtToken = sessionStorage.getItem("jwtToken");
			axios.defaults.headers.common["Authorization"] = `Bearer ${storedJwtToken}`;
			const response = await axios.get("http://localhost:1337/api/courses");
			setMyData(response.data.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="body">
			<InsNavbar />
			<div className=" d-flex justify-content-center">
				<Row className=" " md="auto">
					{myData.map((c, i) => (
						<SmallCourse key={i} course={c} />
					))}
				</Row>
			</div>
			{/* <TopIns data={myData} /> */}
		</div>
	);
};

export default InsSee;
