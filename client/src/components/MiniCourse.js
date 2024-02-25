import { useEffect } from "react";
import { Card, Stack } from "react-bootstrap";

function MiniCourse({ course }) {
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.formats.thumbnail.url;
	const teacher = courseContent.owner.data?.attributes;
	useEffect(() => {
		console.log(course);
	}, []);
	return (
		<>
			<Card className="d-flex justify-content-center">
				<div className="d-flex">
					<Card.Img
						className="d-flex p-2 w-50 h-50"
						fluid="true"
						rounded="true"
						src={"http://localhost:1337" + picture}
					/>
					<Stack>
						<Card.Text className="m-0">ชื่อ {courseContent.title}</Card.Text>
						<Card.Text className="m-0">เนื้อหา {courseContent.description}</Card.Text>
						<Card.Text className="m-0">ระยะเวลา {courseContent.duration}</Card.Text>
						<Card.Text className="m-0">ครู {teacher.username}</Card.Text>
					</Stack>
				</div>
			</Card>
		</>
	);
}
export default MiniCourse;
