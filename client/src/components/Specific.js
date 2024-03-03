import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Collapse, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import conf from "../conf/main";
import ax from "../conf/ax";
import AddLike from "./addlike";

const Specific = ({ data }) => {
	const { item } = useParams();
	const [openReview, setOpenReview] = useState(false);
	const [CourseSyllabus, setCourseSyllabus] = useState([]);
	const [like, setLike] = useState(data.attributes.entries?.data[0]?.attributes?.like);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	useEffect(() => {
		console.log("Specific:", data);
		console.log("item", item);
		setCourseSyllabus(data.attributes.course_syllabus);
		console.log("course", CourseSyllabus);
		{
			CourseSyllabus.map((val, index) => () => {
				console.log(val.title);
			});
		}
	}, [data, item]);

	const AddCart = async () => {
		try {
			const jwtToken = sessionStorage.getItem("auth.jwt");
			if (!jwtToken) {
				console.error("JWT token not found.");
				return;
			}
			const response = await ax.get(`${conf.apiUrlPrefix}/courses/${item}/toCart`);
			console.log(response);
			if (response.data.AddToCart) {
				setModalMessage("Course added to cart!");
				setShowModal(true);
			} else if (response.data.RemoveFromCart) {
				setModalMessage("Course removed from cart!");
				setShowModal(true);
			}
			// window.location.href = "/cart";
		} catch (error) {
			console.error("Error fetching data:", error);
		}
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
											src={conf.url + data.attributes.picture.data.attributes.url}
											alt="item"
											width={300}
										/>
										<p style={{ fontFamily: 'Arial, sans-serif', marginTop: '10px' }}>
											Amount: {data.attributes.amount} | <AddLike course={data}/> ({data.attributes.likeCount})
										</p>

									</div>
								</div>
							</Col>
							<Col md={6} style={{ marginTop: '20px' }}>
								<div style={{ margin: '20px' }}>
									<h4 style={{ fontFamily: 'Arial, sans-serif', marginBottom: '8px' }}>{data.attributes.title}</h4>
									<p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: 'red', fontWeight: 'bold' }}>{data.attributes.price} ฿</p>
									<p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px', wordWrap: "break-word", lineHeight: '2' }}>
										<span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>รายละเอียดคอร์ส</span> : {data.attributes.description}
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
						<div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
							<Button variant="outline-dark" style={{ marginBottom: "10px" }} onClick={AddCart}>
								add to cart
							</Button>
						</div>
					</Container>
				</div>
			)}
			<Modal show={showModal} onHide={() => { setShowModal(false); window.location.href = "/cart"; }}>
				<Modal.Header closeButton>
					<Modal.Title>Notification</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => { setShowModal(false) }}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Specific;
