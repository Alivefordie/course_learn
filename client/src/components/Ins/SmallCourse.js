import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import conf from "../../conf/main";
import ax from "../../conf/ax";

function SmallCourse({ course, setLoading, fetchData }) {
	const navigate = useNavigate();
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.url;
	const teacher = courseContent.owner.data?.attributes;
	useEffect(() => {
		//console.log(course);
	}, []);

	const deleteAction = async () => {
		setLoading(true);
		await ax.delete(`${conf.apiUrlPrefix}/courses/${course.id}`);
		await fetchData();
	};
	const editAction = () => {
		navigate(`${course.id}`);
	};
	return (
		<>
			<Card className="m-2">
				<Card.Img
					sizes="xs"
					className=""
					onClick={() => navigate(`${course.id}`)}
					style={{ cursor: "pointer", width: "100%", width: "200px", height: "200px" }}
					variant="top"
					src={conf.url + picture}
				/>
				<Card.Body className=" ">
					<Row>
						<Col>
							<Card.Title className="d-flex justify-content-between">
								<Card.Text onClick={() => navigate(`${course.id}`)} style={{ cursor: "pointer" }}>
									{courseContent.title}
								</Card.Text>
								<div>
									<Card.Img
										className="mx-2"
										onClick={deleteAction}
										style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
										variant="top"
										src="../trash.svg"
									/>
									<Card.Img
										className=""
										onClick={() => navigate(`${course.id}`)}
										style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
										variant="top"
										src="../pencil.svg"
									/>
								</div>
							</Card.Title>
							<div onClick={() => navigate(`${course.id}`)} style={{ cursor: "pointer" }}>
								<Card.Text className="m-0">details</Card.Text>
								<Card.Text className="m-0 ms-2">{courseContent.description}</Card.Text>
								<Card.Text className="m-0">ระยะเวลา {courseContent.duration}</Card.Text>
								<Card.Text className="m-0">ครู {teacher.username}</Card.Text>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</>
	);
}
export default SmallCourse;
