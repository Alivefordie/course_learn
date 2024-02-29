import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Specific from "../../components/Specific";
import NavbarTop from "../../components/NavbarTop";
import NavbarLink from "../../components/NavbarLink";
import Spinner from "../../components/Spinner";

const CourseInfo = () => {
	const [courses1, setCourses1] = useState([]);
	const { item } = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:1337/api/courses/${item}`);
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
