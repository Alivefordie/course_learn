import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import Spinner from "../../components/Spinner";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import { useParams } from "react-router-dom";

const Coursedata = () => {
	const [myData, setMyData] = useState([]);
	const [loading, setLoading] = useState(true);
	const param = useParams();

	const fetchData = async () => {
		try {
			const response = await ax.get(`${conf.apiUrlPrefix}/courses/${param.course}`);
			setMyData(response.data.data);
			console.log(response.data.data);
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
			{loading ? <Spinner /> : <Container></Container>}
		</div>
	);
};

export default Coursedata;
