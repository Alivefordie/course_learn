import { useContext, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import { AuthContext } from "../context/AuthContext";
import AddCart from "./addcart";
import AddLike from "./addlike";

function MiniCourse({ course }) {
	const context = useContext(AuthContext);
	const login = context.state.isLoggedIn;
	const navigate = useNavigate();
	const courseContent = course.attributes;
	const picture = courseContent.picture.data.attributes.url;
	const teacher = courseContent.owner.data?.attributes;


	useEffect(() => {
		console.log('course',course)
		// console.log(login);
		// console.log(like);
		// console.log(courseContent);
	}, []);

	return (
		<>
<<<<<<< HEAD
			<Card className="d-flex flex-row" style = {{marginTop : '15px',marginRight: '5px'}}>
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
						<Card.Title>{courseContent.title}✅</Card.Title>
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
						{!like ? (
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
=======
			<Card className="d-flex flex-row" style={{ marginTop: "15px" }}>
            <div
                onClick={() => navigate(`/courses/${course.id}`)}
                style={{ cursor: "pointer" }}
                className="image-col">
                <Card.Img className="course-image" variant="left" src={conf.url + picture} />
            </div>
            <div className="body-col">
                <Card.Body
                    onClick={() => navigate(`/courses/${course.id}`)}
                    style={{ cursor: "pointer" }}>
                    <Card.Title>{courseContent.title}✅</Card.Title>
                    <Card.Text className="m-0">{courseContent.description.slice(0, 55)}...</Card.Text>
                    <Card.Text className="m-0">ระยะเวลา {courseContent.duration}</Card.Text>
                    <Card.Text className="m-0">ครู {teacher.username}</Card.Text>
                    
                </Card.Body>
                <Col className="add-icon position-absolute top-0 end-0 p-2">
                    <AddCart course={course}/>
                </Col>
                <Col className="heart-icon position-absolute bottom-0 end-0 p-2">
                    ({courseContent.likeCount}) <AddLike course={course}/>
                </Col>
            </div>
        </Card>
>>>>>>> 20c07217a18b7d3fd9f89c3b8f235d8f4aa6c53b
		</>
	);
}
export default MiniCourse;
