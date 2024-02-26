import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Button, Spinner, Form, Row, Image } from "react-bootstrap";
import axios from "axios";
import InsNavbar from "../../components/Ins/InsNavbar";
import Accordion from "react-bootstrap/Accordion";
import conf from "../../conf/main";
import ax from "../../conf/ax";

const CreateCourse = () => {
	const [CourseData, setCourseData] = useState(null);
	const [CourseSyllabus, setCourseSyllabus] = useState(null);
	const [picture, setPicture] = useState(null);
	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setCourseData({
			...CourseData,
			[e.target.name]: e.target.value,
		});
	};
	const handlePicture = (e) => {
		setPicture({
			["files.picture"]: e.target.files[0],
		});
	};
	const postCourse = async () => {
		const form = new FormData();
		const jwtToken = sessionStorage.getItem("auth.jwt");
		axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
		form.append("data", JSON.stringify(CourseData));
		form.append("files.picture", picture["files.picture"]);
		const response = await axios.post("http://localhost:1337/api/courses", form);
		console.log(response);
		setLoading(false);
	};
	const handleCreate = (event) => {
		event.preventDefault();
		setLoading(true);
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			postCourse();
		}
		setLoading(false);
		setValidated(true);
	};
	useEffect(() => {
		console.log();
	}, []);
	return (
		<div className="body ">
			<InsNavbar />
			{loading ? (
				<Spinner animation="border" role="status" />
			) : (
				<Container sm="3" md="4">
					<Row>
						<Col className="courseData-col">
							<Form
								id="myform"
								noValidate
								validated={validated}
								onSubmit={handleCreate}
								className="mt-3">
								<Form.Group controlId="formTitle">
									<Form.Label>Title</Form.Label>
									<Form.Control
										required
										onChange={handleChange}
										type="text"
										name="title"
										placeholder="Enter title"
									/>
								</Form.Group>
								<Form.Group controlId="formDescription">
									<Form.Label>Description</Form.Label>
									<Form.Control
										required
										onChange={handleChange}
										as="textarea"
										rows={3}
										name="description"
										placeholder="Enter description"
									/>
								</Form.Group>

								<Form.Group controlId="formPicture">
									<Form.Label>Cover</Form.Label>
									{!picture ? (
										<Form.Control required type="file" onChange={handlePicture} name="picture" />
									) : (
										<>
											<br />
											<Image
												className="h-50 w-50"
												src={URL.createObjectURL(picture["files.picture"])}
											/>
											<Button onClick={() => setPicture(null)} variant="outline-danger">
												delete
											</Button>
										</>
									)}
								</Form.Group>
								<Row className="mb-4">
									<Form.Group as={Col} controlId="formPrice">
										<Form.Label>Price</Form.Label>
										<Form.Control
											required
											type="number"
											name="price"
											onChange={handleChange}
											placeholder="Enter price"
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="formMaxCapacity">
										<Form.Label>Max Capacity</Form.Label>
										<Form.Control
											required
											onChange={handleChange}
											type="number"
											name="maxCapacity"
											placeholder="Enter max capacity"
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="formMaxCapacity">
										<Form.Label>Duration</Form.Label>
										<Form.Control
											required
											onChange={handleChange}
											type="number"
											name="duration"
											placeholder="Enter duration"
										/>
									</Form.Group>
								</Row>
							</Form>
						</Col>
						<Col className="syllabus-col">
							<Button form="myform" type="submit">
								New
							</Button>
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
};
export default CreateCourse;
