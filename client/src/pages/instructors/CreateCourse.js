import React, { useState } from "react";
import { Container, Col, btn, Form, Row, Image, Button } from "react-bootstrap";
import Spinner from "../../components/Spinner";

import Accordion from "react-bootstrap/Accordion";
import conf from "../../conf/main";
import ax from "../../conf/ax";
import NavbarTop from "../../components/NavbarTop";
import style from "../../css/CreateCourse.module.css";

const CreateCourse = () => {
	const [CourseData, setCourseData] = useState(null);
	const [CourseSyllabus, setCourseSyllabus] = useState([]);
	const [picture, setPicture] = useState(null);
	const [validated, setValidated] = useState(false);
	const [Svalidated, setSValidated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [edit, setedit] = useState(false);

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
	// send axios
	const postCourse = async () => {
		setLoading(true);
		const form = new FormData();
		const data = CourseSyllabus.map((c, i) => {
			if (c.__component == "activity.video") {
				form.append(`files.course_syllabus[${i}].videoFile`, c.videoFile[0]);
				return { ["__component"]: c.__component, ["title"]: c.title };
			} else if (c.__component == "activity.file") {
				form.append(`files.course_syllabus[${i}].material`, c.material[0]);
				return { ["__component"]: c.__component, ["title"]: c.title };
			}
			return { ["__component"]: c.__component, ["title"]: c.title, ["description"]: c.description };
		});
		const sendData = { ...CourseData, ["course_syllabus"]: data };
		// console.log(sendData);
		form.append("data", JSON.stringify(sendData));
		form.append("files.picture", picture["files.picture"]);
		const response = await ax.post(`${conf.apiUrlPrefix}/courses`, form);
		console.log(response);
		// link to some page
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

	const handleValidate = (event, i) => {
		event.preventDefault();
		const form = document.getElementById("CForm");
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			setedit(false);
			handleSyllabusChange(event, i);
		}
		setSValidated(true);
	};

	const addFile = () => {
		setedit(true);
		setSValidated(false);
		setCourseSyllabus([
			...CourseSyllabus,
			{ __component: "activity.file", title: "", material: null, Nmaterial: "", onEdit: false },
		]);
	};
	const addvideo = () => {
		setedit(true);
		setSValidated(false);
		setCourseSyllabus([
			...CourseSyllabus,
			{ __component: "activity.video", title: "", videoFile: null, NvideoFile: "", onEdit: false },
		]);
	};
	const addtext = () => {
		setedit(true);
		setSValidated(false);
		setCourseSyllabus([
			...CourseSyllabus,
			{ __component: "activity.text", title: "", description: "", onEdit: false },
		]);
	};
	const handleDelete = (ed, i) => {
		const deleteVal = [...CourseSyllabus];
		deleteVal.splice(i, 1);
		if (deleteVal.length === 0) {
			setedit(false);
		}
		setCourseSyllabus(deleteVal);
	};
	const handleSyllabusChange = (e, i) => {
		const { name, value } = e.target;
		const onchangeVal = [...CourseSyllabus];
		onchangeVal[i][name] = value;
		setCourseSyllabus(onchangeVal);
	};
	const handleSyllabusFileChange = (e, i) => {
		const { name, files, value } = e.target;
		const onchangeVal = [...CourseSyllabus];
		onchangeVal[i][name] = files;
		onchangeVal[i]["N" + name] = value;
		setCourseSyllabus(onchangeVal);
	};


	return (

		<div className={style.body}>
			<NavbarTop />
			{loading ? (
				<Spinner />
			) : (
				<Container sm="3" md="4">
					<Row>

						<Col className={`${style.courseDataCol} courseData-col`}>
							<Form id="myform" noValidate validated={validated} onSubmit={handleCreate} className={`mt-3 ${style.customForm}`}>
								<Form.Group controlId="formTitle">
									<Form.Label>Title</Form.Label>
									<Form.Control required onChange={handleChange} type="text" name="title" placeholder="Enter title" />
								</Form.Group>

								<Form.Group controlId="formDescription">
									<Form.Label>Description</Form.Label>
									<Form.Control required onChange={handleChange} as="textarea" rows={3} name="description" placeholder="Enter description" />
								</Form.Group>

								<Form.Group controlId="formPicture">
									<Form.Label>Cover</Form.Label>
									{!picture ? (
										<Form.Control required type="file" accept="image/png" onChange={handlePicture} name="picture" />
									) : (
										<>
											<br />
											<Image className="h-25 w-25 mb-1" src={URL.createObjectURL(picture["files.picture"])} />
											<br />
											<Button onClick={() => setPicture(null)} variant="outline-danger">Delete Image</Button>
										</>
									)}
								</Form.Group>

								<Row className="mb-4">
									<Form.Group as={Col} controlId="formPrice">
										<Form.Label>Price</Form.Label>
										<Form.Control required type="number" name="price" min="1" step="1" onChange={handleChange} placeholder="Enter price" />
									</Form.Group>

									<Form.Group as={Col} controlId="formMaxCapacity">
										<Form.Label>Max Capacity</Form.Label>
										<Form.Control required onChange={handleChange} type="number" min="1" step="1" name="maxCapacity" placeholder="Enter max capacity" />
									</Form.Group>

									<Form.Group as={Col} controlId="formMaxCapacity">
										<Form.Label>Duration</Form.Label>
										<Form.Control required onChange={handleChange} type="number" min="1" step="1" name="duration" placeholder="Enter duration" />
									</Form.Group>
								</Row>
							</Form>
						</Col>





						<Col className={`${style.scrollbar} syllabus-col`}>
							{!edit && (
								<div className="m-1 d-flex">

									<div className="m-3">
										<Button style={{ backgroundColor: 'transparent', border: 'none' }} className="m-1 custom-btn" onClick={addFile}>
											<img src="/file-earmark-pdf.svg" alt="File" width="50px" />
										</Button>
									</div>

									<div className="m-3">
										<Button style={{ backgroundColor: 'transparent', border: 'none' }} className="m-1 custom-btn" onClick={addvideo}>
											<img src="/file-earmark-play.svg" alt="File" width="50px" />
										</Button>
									</div>
									<div className="m-3">
										<Button style={{ backgroundColor: 'transparent', border: 'none' }} className="m-1 custom-btn" onClick={addtext}>
											<img src="/card-text.svg" alt="File" width="50px" />
										</Button>
									</div>
									<br />

								</div>

							)}

							<Form id="CForm" noValidate validated={Svalidated} className="mt-3">
								{CourseSyllabus.map((val, i) => {
									switch (val.__component) {
										case "activity.file":
											if (!val.onEdit) {
												return (
													<div key={i}>
														<Form.Group as={Row} className="mb-3">
															<Form.Text>
																<strong>
																	file
																</strong>
															</Form.Text>
															<Form.Label column sm={2}>
																<strong>Title</strong>
															</Form.Label>
															<Col sm={10}>
																<Form.Control
																	required
																	type="text"
																	value={val.title}
																	onChange={(e) => handleSyllabusChange(e, i)}
																	name="title"
																	placeholder="Enter title"
																/>
															</Col>
														</Form.Group>

														<Form.Group as={Row} className="mb-3">
															<Form.Label column sm={2}>
																<strong >File</strong>

															</Form.Label>
															<Col sm={10}>
																<Form.Control
																//word png exal เอกสาร บลาๆ
																	accept="image/png, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, .doc, .docx, .xls"
																	required
																	onChange={(e) => handleSyllabusFileChange(e, i)}
																	type="file"
																	name="material"
																/>
															</Col>
														</Form.Group>
														<button className="custom-btn delete-btn"
															onClick={(e) => {
																e.preventDefault();
																handleDelete(val.onEdit, i);
															}}>
															Back
														</button>
														<button className="custom-btn save-btn"
															form="CForm"
															name="onEdit"
															value={true}
															onClick={(e) => handleValidate(e, i)}>
															Save
														</button>
													</div>
												);
											} else {
												return (
													<div key={i}>
														<Accordion>
															<Accordion.Header>
																{val.title ? `${1 + i}. ${val.title}` : `${1 + i}. No Title`}
															</Accordion.Header>
															<Accordion.Body>
																{val.material ? val.material[0].name : "No file"}
															</Accordion.Body>
														</Accordion>
														<Button variant="danger" className={style.op}
															onClick={(e) => {
																e.preventDefault();
																handleDelete(val.onEdit, i);
															}}>
															Delete
														</Button>
													</div>
												);
											}

										case "activity.video":
											if (!val.onEdit) {
												return (
													<div key={i}>
														<Form.Group as={Row} className="mb-3">
															<Form.Text>Video</Form.Text>
															<Form.Label column sm={2}>
																<strong>
																	Title
																</strong>
															</Form.Label>
															<Col sm={10}>
																<Form.Control
																	required
																	type="text"
																	onChange={(e) => handleSyllabusChange(e, i)}
																	value={val.title}
																	name="title"
																	placeholder="Enter title"
																/>
															</Col>
														</Form.Group>
														<Form.Group as={Row} className="mb-3">
															<Form.Label column sm={2}>
																<strong>
																	Video
																</strong>
															</Form.Label>
															<Col sm={10}>
																<Form.Control
																//mp4
																	accept="video/mp4, .mp4"
																	required
																	type="file"
																	onChange={(e) => handleSyllabusFileChange(e, i)}
																	name="videoFile"
																/>
															</Col>
														</Form.Group>
														<Button variant="danger" className="m-2" onClick={(e) => {
															e.preventDefault();
															handleDelete(val.onEdit, i);
														}}>
															Back
														</Button>

														<Button form="CForm" name="onEdit" value={true} onClick={(e) => handleValidate(e, i)}>
															Save
														</Button>

													</div>
												);
											} else {
												return (
													<div key={i}>
														<Accordion>
															<Accordion.Header>
																{val.title ? `${1 + i}. ${val.title}` : `${1 + i}. No Title`}
															</Accordion.Header>
															<Accordion.Body>
																{val.videoFile ? val.videoFile[0].name : "No file"}
															</Accordion.Body>
														</Accordion>

														<Button className={style.op} variant="danger" onClick={(e) => {
															e.preventDefault();
															handleDelete(val.onEdit, i);
														}}>
															Delete
														</Button>



													</div>
												);
											}
										case "activity.text":
											if (!val.onEdit) {
												return (
													<div key={i}>
														<Form.Group as={Row} className="mb-3">
															<Form.Text>Text</Form.Text>
															<Form.Label column sm={2}>
																<strong>
																	Title
																</strong>
															</Form.Label>
															<Col sm={10}>
																<Form.Control
																	onChange={(e) => handleSyllabusChange(e, i)}
																	required
																	type="text"
																	value={val.title}
																	name="title"
																	placeholder="Enter title"
																/>
															</Col>
														</Form.Group>
														<Form.Group as={Row} className="mb-3">
															<Form.Label column sm={2}>
																<strong>

																	description
																</strong>
															</Form.Label>
															<Col sm={10}>
																<Form.Control
																	onChange={(e) => handleSyllabusChange(e, i)}
																	required
																	as="textarea"
																	value={val.description}
																	name="description"
																	placeholder="Enter description"
																/>
															</Col>
														</Form.Group>
														<Button className="custom-btn delete-btn" variant="danger" onClick={(e) => {
															e.preventDefault();
															handleDelete(val.onEdit, i);
														}}>
															Back
														</Button>

														<Button className="btn" form="CForm" name="onEdit" value={true} onClick={(e) => handleValidate(e, i)}>
															Save
														</Button>



													</div>
												);
											} else {
												return (
													<div key={i}>
														<Accordion>
															<Accordion.Header>
																{val.title ? `${1 + i}. ${val.title}` : `${1 + i}. No Title`}
															</Accordion.Header>
															<Accordion.Body>{val.description}</Accordion.Body>
														</Accordion>
														<Button className={style.op} variant="danger" onClick={(e) => {
															e.preventDefault();
															handleDelete(val.onEdit, i);
														}}>
															Delete
														</Button>

													</div>
												);
											}
									}
								})}
							</Form>
							{!edit && (
								<Button form="myform" type="submit" className={`${style.customBtn} btn btn-outline-danger ml-200`}>
									Save to <img src="/floppy.svg" alt="Bag Icon" className="mr-2" />
								</Button>


							)}
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
};
export default CreateCourse;
