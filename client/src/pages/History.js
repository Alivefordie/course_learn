import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import axios from "axios";
import "../App.css";
import "../css/History.module.css";
import moment from "moment";
import _ from "lodash";
import MiniCourse from "../components/MiniCourse";

const History = () => {
	const [myCourses, setmyCourse] = useState("");
	const fetch = async () => {
		const storedJwtToken = sessionStorage.getItem("jwtToken");
		axios.defaults.headers.common["Authorization"] = `Bearer ${storedJwtToken}`;
		const response = await axios.get("http://localhost:1337/api/my-courses");
		const courses = response.data.data;
		const time = ["week", "month", "year"];
		let GroupCourses = {};
		time.forEach((t) => {
			const groupConditon = _.groupBy(courses, (c) =>
				moment(c.attributes.entries.data[0].attributes.enroll).isSame(moment(), t)
			);
			GroupCourses = { ...GroupCourses, [t]: groupConditon.true };
		});
		setmyCourse(GroupCourses);
	};
	useEffect(() => {
		fetch();
	}, []);
	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			<Container sm="3" md="4">
				<Row>
					<Col className="week-col">
						<h1 className="righteous d-flex justify-content-center">This week</h1>
						<Container className="item-week">
							{myCourses.week ? (
								myCourses.week.map((c) => <MiniCourse key={c.id} course={c}></MiniCourse>)
							) : (
								<h1>no data</h1>
							)}
						</Container>
					</Col>
					<Col className="month-col">
						<h1 className="righteous d-flex justify-content-center">This month</h1>
						<Container className="item-month">
							{myCourses.month ? (
								myCourses.month.map((c) => <MiniCourse key={c.id} course={c}></MiniCourse>)
							) : (
								<h1>no data</h1>
							)}
						</Container>
					</Col>
					<Col className="year-col">
						<h1 className="righteous d-flex justify-content-center">This year</h1>
						<Container className="item-year">
							{myCourses.year ? (
								myCourses.year.map((c) => <MiniCourse key={c.id} course={c}></MiniCourse>)
							) : (
								<h1>no data</h1>
							)}
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default History;
