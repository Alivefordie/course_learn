import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SmallCourse({ course }) {
	const navigate = useNavigate();
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.formats.thumbnail.url;
	const teacher = courseContent.owner.data?.attributes;
	useEffect(() => {
		console.log(course);
	}, []);
	return (
		<>
			<Card
				onClick={() => navigate(`${course.id}`)}
				style={{ cursor: "pointer" }}
				className="m-2 d-flex flex-row">
				<div className="image-col">
					<Card.Img
						className="course-image"
						variant="left"
						src={"http://localhost:1337" + picture}
					/>
				</div>
				<div className="body-col">
					<Card.Body>
						<Card.Title>{courseContent.title}</Card.Title>
						<Card.Text>details</Card.Text>
						<Card.Text className="m-0">เนื้อหา {courseContent.description}</Card.Text>
						<Card.Text className="m-0">ระยะเวลา {courseContent.duration}</Card.Text>
						<Card.Text className="m-0">ครู {teacher.username}</Card.Text>
					</Card.Body>
				</div>
			</Card>
		</>
	);
}
export default SmallCourse;
