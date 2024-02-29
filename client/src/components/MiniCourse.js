import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";

function MiniCourse({ course }) {
	const navigate = useNavigate();
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.url;
	const teacher = courseContent.owner.data?.attributes;
	const [like, setLike] = useState(courseContent.entries?.data[0]?.attributes?.like);
	const [cart, setcart] = useState(courseContent.entries?.data[0]?.attributes?.cart);
	const enroll = courseContent.entries?.data[0]?.attributes?.enroll;

	const addTolike = async () => {
		const response = await ax.get(conf.apiUrlPrefix + `/courses/${course.id}/like`);
		setLike(response.data.like);
	};

	const addToCart = async () => {
		const response = await ax.get(conf.apiUrlPrefix + `/courses/${course.id}/toCart`);
		setcart(response.data.AddToCart);
	};

	useEffect(() => {
		//console.log(courseContent);
	}, []);

	return (
		<>
			<Card className="d-flex flex-row">
				<div
					onClick={() => navigate(`/courses/${course.id}`, { replace: true })}
					style={{ cursor: "pointer" }}
					className="image-col">
					<Card.Img
						className="course-image"
						variant="left"
						src={"http://localhost:1337" + picture}
					/>
				</div>
				<div className="body-col">
					<Card.Body
						onClick={() => navigate(`/courses/${course.id}`, { replace: true })}
						style={{ cursor: "pointer" }}>
						<Card.Title>{courseContent.title}</Card.Title>
						<Card.Text>details</Card.Text>
						<Card.Text className="m-0">เนื้อหา {courseContent.description}</Card.Text>
						<Card.Text className="m-0">ระยะเวลา {courseContent.duration}</Card.Text>
						<Card.Text className="m-0">ครู {teacher.username}</Card.Text>
					</Card.Body>
					<Col className="add-icon position-absolute top-0 end-0 p-2">
						{enroll ? (
							<img
								onClick={addToCart}
								style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
								src="../check-all.svg"
								alt="Add Icon"
							/>
						) : cart ? (
							<img
								onClick={addToCart}
								style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
								src="../cart-check.svg"
								alt="Add Icon"
							/>
						) : (
							<img
								onClick={addToCart}
								style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
								src="../plus.png"
								alt="Add Icon"
							/>
						)}
					</Col>
					<Col className="heart-icon position-absolute bottom-0 end-0 p-2">
						{like ? (
							<img
								onClick={addTolike}
								style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
								src="../heart.png"
								alt="Like Icon"
							/>
						) : (
							<img
								onClick={addTolike}
								style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
								src="../red-heart-icon.svg"
								alt="Like Icon"
							/>
						)}
					</Col>
				</div>
			</Card>
		</>
	);
}
export default MiniCourse;
