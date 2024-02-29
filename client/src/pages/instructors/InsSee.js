import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import SmallCourse from "../../components/Ins/SmallCourse";
import { Row } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import Spinner from "../../components/Spinner";
import ax from "../../conf/ax";

const InsSee = () => {
	const [myData, setMyData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await ax.get("http://localhost:1337/api/courses?owner=true");
			setMyData(response.data.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="body">
			<NavbarTop />
			{loading ? (
				<Spinner />
			) : (
				<div className=" d-flex justify-content-center">
					<Row className=" " md="auto">
						{myData.map((c, i) => (
							<SmallCourse key={i} course={c} />
						))}
					</Row>
				</div>
			)}
		</div>
	);
};

export default InsSee;
