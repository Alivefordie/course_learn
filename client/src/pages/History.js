import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import "../App.css";
import style from "../css/History.module.css";
import moment from "moment";
import _ from "lodash";
import MiniCourse from "../components/MiniCourse";
import Spinner from "../components/Spinner";
import ax from "../conf/ax";
import conf from "../conf/main";

const History = () => {
	const [myCourses, setmyCourse] = useState("");
	const [loading, setLoading] = useState(true);

	const fetch = async () => {
		const response = await ax.get(`${conf.apiUrlPrefix}/my-courses`);
		const courses = response.data.data;
		const time = ["week", "month", "year"];
		let GroupCourses = {};
		time.forEach((t) => {
			const groupConditon = _.groupBy(courses, (c) =>
				moment(c.attributes.entries.data[0].attributes.enroll).isSame(moment(), t)
			);
			GroupCourses = { ...GroupCourses, [t]: groupConditon.true ? groupConditon.true : [] };
		});
		const month = GroupCourses["month"].filter(
			(m) => !GroupCourses["week"].find((w) => m.id == w.id)
		);
		const deleteMonthFromYear = GroupCourses["year"].filter(
			(y) => !GroupCourses["month"].find((m) => m.id == y.id)
		);
		const deleteAllFromYear = deleteMonthFromYear.filter(
			(y) => !GroupCourses["week"].find((w) => y.id == w.id)
		);
		GroupCourses["month"] = month;
		GroupCourses["year"] = deleteAllFromYear;
		setmyCourse(GroupCourses);
		console.log(GroupCourses)
		setLoading(false);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			{loading ? (
				<Spinner />
			) : (
				<Container sm="3" md="4">
					<Row>
						<Col className="top-rank-course col-shadow scrollbar ">
							<h1 className={style.header}>
								This week
							</h1>
							<Container className="">
								{myCourses.week.length ? (
									myCourses.week.map((c, i) => (
										c.attributes.entries.data.map((date, index) =>
											<div key={i}>
												<h5 className="dateText">
													{moment(date.attributes.enroll).format("-- D MMMM")}
												</h5>
												<MiniCourse course={c} />
											</div>)
									))
								) : (
									<h3 className={`mx-auto ${style.error}`}>no data</h3>
								)}
							</Container>
						</Col>
						<Col className="top-rank-course col-shadow scrollbar ">
							<h1 className={style.header}>
								This month
							</h1>
							<Container className="item-month">
								{myCourses.month.length ? (
									myCourses.month.map((c, i) => (
										c.attributes.entries.data.map((date, index) =>
											<div key={i}>
												<h5 className="dateText">
													{moment(date.attributes.enroll).format("-- D MMMM")}
												</h5>
												<MiniCourse course={c} />
											</div>)
									))
								) : (
									<h3 className={style.error}>no data</h3>
								)}
							</Container>
						</Col>
						<Col className="top-rank-course col-shadow scrollbar">
							<h1 className={style.header}>
								This year
							</h1>
							<Container className="item-year">
								{myCourses.year.length ? (
									myCourses.year.map((c, i) => (
										c.attributes.entries.data.map((date, index) =>
											<div key={i}>
												<h5 className="dateText">
													{moment(date.attributes.enroll).format("-- D MMMM")}
												</h5>
												<MiniCourse course={c} />
											</div>)
									))
								) : (
									<h3 className={style.error}>no data</h3>
								)}
							</Container>
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
};

export default History;
