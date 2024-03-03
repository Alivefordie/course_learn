import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import conf from "../conf/main";
import ax from "../conf/ax";

const Specific = ({ data }) => {
	const { item } = useParams();
	const [openReview, setOpenReview] = useState(false);
	const [CourseSyllabus, setCourseSyllabus] = useState([]);

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
				alert("course add");
			} else if (response.data.RemoveFromCart) {
				alert("course remove");
			}
			window.location.href = "/";
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
										<h4>Title: {data.attributes.title}</h4>
									</div>
									<p style={{ wordWrap: "break-word" }}>
										Description: {data.attributes.description}
									</p>
									<p>Amount: {data.attributes.amount}</p>
									<p>Link Count: {data.attributes.likeCount}</p>
								</div>
							</Col>
							<Col md={6}>
								<Card>
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
								</Card>
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
		</Container>
	);
};

export default Specific;
