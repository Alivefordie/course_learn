import React, { useEffect, useState } from "react";
import "../../App.css";
import SmallCourse from "../../components/Ins/SmallCourse";
import { Container, Row } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import Spinner from "../../components/Spinner";
import ax from "../../conf/ax";
import conf from "../../conf/main";

const InsSee = () => {
	const [myData, setMyData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await ax.get(`${conf.apiUrlPrefix}/courses?owner=true`);
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
				<Container>
					<div className="d-flex flex-wrap justify-content-center">
						{myData.map((c, i) => (
							<SmallCourse key={i} course={c} fetchData={fetchData} setLoading={setLoading} />
						))}
					</div>
				</Container>
			)}
		</div>
	);
};

export default InsSee;
