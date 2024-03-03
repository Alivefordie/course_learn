import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap"; // Assuming you are using Bootstrap components
import { useNavigate } from "react-router-dom"; // Assuming you are using Gatsby for navigation
import ax from "../conf/ax"; // Assuming ax is properly configured for Axios requests
import conf from "../conf/main";

const CourseComponent = () => {
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();

	const fetchOwnerCourses = async () => {
		try {
			const response = await ax.get(`${conf.apiUrlPrefix}}/course`);
			const data = await response.json();
			setCourses(data);
		} catch (error) {
			console.error("Error fetching owner courses:", error);
			// Handle the error if necessary
		}
	};

	useEffect(() => {
		fetchOwnerCourses();
	}, []); // Empty dependency array to ensure useEffect runs only once

	return (
		<div>
			{courses.map((course) => (
				<Card key={course.id} className="d-flex flex-row">
					<div
						onClick={() => navigate(`/courses/${course.id}`, { replace: true })}
						style={{ cursor: "pointer" }}
						className="image-col">
						<Card.Img className="course-image" variant="left" src={conf.url + course.picture} />
					</div>
					<div className="body-col">
						<Card.Body
							onClick={() => navigate(`/courses/${course.id}`, { replace: true })}
							style={{ cursor: "pointer" }}>
							<Card.Title>{course.courseContent.title}</Card.Title>
							<Card.Text>details</Card.Text>
							<Card.Text className="m-0">เนื้อหา {course.courseContent.description}</Card.Text>
							<Card.Text className="m-0">ระยะเวลา {course.courseContent.duration}</Card.Text>
							<Card.Text className="m-0">ครู {course.teacher.username}</Card.Text>
						</Card.Body>
					</div>
				</Card>
			))}
		</div>
	);
};

export default CourseComponent;
