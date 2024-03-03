import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Specific from "../../components/Specific";
import NavbarTop from "../../components/NavbarTop";
import NavbarLink from "../../components/NavbarLink";
import Spinner from "../../components/Spinner";
import ax from "../../conf/ax";
import conf from "../../conf/main";

const CourseInfo = () => {
	const [courses1, setCourses1] = useState([]);
	const { item } = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await ax.get(`${conf.apiUrlPrefix}/courses/${item}`);
				const coursesData = response.data.data;
				setCourses1(coursesData);
				// console.log(coursesData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [item]);

	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			{loading ? <Spinner /> : <Specific data={courses1} />}
		</div>
	);
};

export default CourseInfo;
