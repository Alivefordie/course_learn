import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Collapse, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import conf from "../conf/main";
import ax from "../conf/ax";
import AddLike from "./addlike";
import AddCart from "./addcart";
import styles from "../css/Popup.module.css";

const Specific = ({ data }) => {
	const { item } = useParams();
	const course = data.attributes;
	const remaining = course.maxCapacity - course.amount;
	const [CourseSyllabus, setCourseSyllabus] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const jwtToken = sessionStorage.getItem("auth.jwt");

	useEffect(() => {
		console.log("Specific:", data);
		console.log("item", item);
		console.log(course)
		setCourseSyllabus(course.course_syllabus);
		console.log("course", CourseSyllabus);
		{
			CourseSyllabus.map((val, index) => () => {
				console.log(val.title);
			});
		}
	}, [data, item]);

	// const AddtoCart = async () => {
	// 	try {
	// 		if (jwtToken) {
	// 			const response = await ax.get(conf.apiUrlPrefix + `/courses/${item}/toCart`);
	// 			console.log(response)
	// 		if (response.data.AddToCart) {
	// 			setModalMessage("Course added to cart!");
	// 			setShowModal(true);
	// 		} else if (response.data.RemoveFromCart) {
	// 			setModalMessage("Course removed from cart!");
	// 			setShowModal(true);
	// 		}
	// 	}
	// 		// window.location.href = "/cart";
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 	}
	// };

	const handleAddCartResponse = (responseData) => {
		setShowModal(true);
		setModalMessage(responseData.data.AddToCart ? "Course added to cart!" : "Course removed from cart!");
	};

	return (
		<Container className="body">
			{data && data.attributes && (
				<div>
					<Container className="course-info">
						<Row>
							<Col md={6}>
								<div>
									<div className="course-title">
										<img
											src={conf.url + course.picture.data.attributes.url}
											alt="item"
											width={300}
										/>
										<span  style={{ fontFamily: 'Arial, sans-serif', marginTop: '10px' }}>
											remaining: {remaining}/{course.maxCapacity} | <AddLike course={data} /> ({course.likeCount}) <br />
											<div className="centeredContent" style={{ flexDirection:"column", textAlign:"center", marginTop:"30px",marginBottom:"-50px" }}>
												<img src="../clock.png" alt="remaining" style={{ width: '40px', height: '40px' }} />
												<p>ชั่วโมงเรียน {course.maxCapacity} ชม.</p>
											</div>
										</span >

									</div>
								</div>
							</Col>
							<Col md={6} style={{ marginTop: '20px' }}>
								<div style={{ margin: '20px' }}>
									<h4 style={{ fontFamily: 'Arial, sans-serif', marginBottom: '8px' }}>{course.title}</h4>
									<p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: 'red', fontWeight: 'bold' }}>{course.price} ฿</p>
									<p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px', wordWrap: "break-word", lineHeight: '2' }}>
										<span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>รายละเอียดคอร์ส</span> : {course.description}
									</p>

								</div>
								{/* <Card>
                                    <Card.Header
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <span style={{ marginRight: "auto" }}>Course Review</span>
                                        <Button
                                            variant="outline-dark"
                                            style={{ border: "0" }}
                                            onClick={() => setOpenReview(!openReview)}
                                            aria-controls="course-review"
                                            aria-expanded={openReview}>
                                            {openReview ? "⮟" : "⮞"}
                                        </Button>
                                    </Card.Header>
                                    <Collapse in={openReview}>
                                        <Card.Body id="course-review">
                                            {CourseSyllabus.map((val, index) => {
                                                switch (val.__component) {
                                                    case "activity.video":
                                                        return (
                                                            <div key={index}>
                                                                <h6>video</h6>
                                                                <p>title: {val.title}</p>
                                                                <p>link: {val.link}</p>
                                                                <p>example: {val.videoFile.data}</p>
                                                                <hr style={{ borderTop: "1px solid black" }} />
                                                            </div>
                                                        );
                                                    case "activity.text":
                                                        return (
                                                            <div key={index}>
                                                                <h6>text</h6>
                                                                <p>title: {val.title}</p>
                                                                <p>description: {val.description}</p>
                                                                <hr style={{ borderTop: "1px solid black" }} />
                                                            </div>
                                                        );
                                                    case "activity.file":
                                                        return (
                                                            <div key={index}>
                                                                <h6>File</h6>
                                                                <p>title: {val.title}</p>
                                                                <p>material: {val.material.data}</p>
                                                            </div>
                                                        );
                                                }
                                            })}
                                        </Card.Body>
                                    </Collapse>
                                </Card> */}
							</Col>
						</Row>
						<div style={{
							margin: "20px", display: "flex", justifyContent: "flex-end"
						}} >
							<AddCart course={data} onResponse={handleAddCartResponse} />
						</div>
					</Container>
				</div>
			)}
			<Modal show={showModal} onHide={() => { setShowModal(false) }}>
				<Modal.Header closeButton />
				<Modal.Body className={styles.modalBody}>
					<Container className={styles.centeredContent}>
						<div className={modalMessage === "Course added to cart!" ? styles.check : styles.exclamation} />
						<span className={styles.loginText}>{modalMessage}</span>
					</Container>
				</Modal.Body>
			</Modal>
		</Container>
	);
};

export default Specific;
