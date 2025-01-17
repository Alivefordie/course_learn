import { useEffect, useState } from "react";
import { Card, Col, Row, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import conf from "../../conf/main";
import ax from "../../conf/ax";

function SmallCourse({ course, setLoading, fetchData }) {
	const navigate = useNavigate();
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.url;
	const teacher = courseContent.owner.data?.attributes;
	const [showModal, setShowModal] = useState(false);


	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const deleteAction = async () => {
		setLoading(true);
		await ax.delete(`${conf.apiUrlPrefix}/courses/${course.id}`);
		await fetchData();
		handleClose();
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
										onClick={handleShow}
										style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
										variant="top"
										src="../trash.svg"
									/>
								</div>
							</Card.Title>
							<div onClick={() => navigate(`${course.id}`)} style={{ cursor: "pointer" }}>
								<Card.Text className="m-0">ระยะเวลา: {courseContent.duration} ชม.</Card.Text>
								<Card.Text className="m-0">ครู: {teacher.username}</Card.Text>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>ยืนยันการลบ</Modal.Title>
				</Modal.Header>
				<Modal.Body>คุณแน่ใจหรือไม่ที่ต้องการลบคอร์สนี้?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						ยกเลิก
					</Button>
					<Button variant="danger" onClick={deleteAction}>
						ลบ
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default SmallCourse;
