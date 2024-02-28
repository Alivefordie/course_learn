import { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MiniCourse({ course }) {
	const navigate = useNavigate();
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.formats.thumbnail.url;
	const teacher = courseContent.owner.data?.attributes;
	return (
		<>
			<Card
				onClick={() => navigate(`/courses/${course.id}`, { replace: true })}
				style={{ cursor: "pointer", width: "100%" }}
				className="d-flex flex-row">
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
					<Col className="add-icon position-absolute top-0 end-0 p-2">
						<img src="../plus.png" style={{ width: "20px", height: "20px" }} alt="Add Icon" />
					</Col>
					<Col className="heart-icon position-absolute bottom-0 end-0 p-2">
						<img src="../heart.png" style={{ width: "20px", height: "20px" }} alt="Like Icon" />
					</Col>
				</div>
			</Card>
		</>
	);
}
export default MiniCourse;
