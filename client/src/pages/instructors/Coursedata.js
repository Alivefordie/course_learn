import React, { useEffect, useState } from "react";
import "../../App.css";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import Spinner from "../../components/Spinner";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import { useParams } from "react-router-dom";

const Coursedata = () => {
	const [myData, setMyData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [CourseSyllabus, setCourseSyllabus] = useState([]);
	const param = useParams();

	const fetchData = async () => {
		try {
			const response = await ax.get(`${conf.apiUrlPrefix}/courses/${param.course}`);
			setMyData(response.data.data);
			console.log('response', response.data.data);
			setCourseSyllabus(response.data.data.attributes.course_syllabus);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	
	return (
		<div className="body">
			<NavbarTop />
			{loading ? <Spinner /> :
				<Container className="course-info">
					<Row>
							<Col md={6}>
								<div>
									<div className="course-title">
										<img
											src={conf.url +  myData.attributes.picture.data.attributes.url}
											alt="item"
											width={300}
										/>
										<span style={{ fontFamily: 'Arial, sans-serif', marginTop: '10px' }}>
											remaining: {myData.attributes.maxCapacity - myData.attributes.amount}/{myData.attributes.maxCapacity} |  {myData.attributes.likeCount} like<br />
											<div className="centeredContent" style={{ flexDirection: "column", textAlign: "center", marginTop: "30px", marginBottom: "-50px" }}>
												<img src="../clock.png" alt="remaining" style={{ width: '40px', height: '40px' }} />
												<p>ชั่วโมงเรียน {myData.attributes.maxCapacity} ชม.</p>
											</div>
										</span >

									</div>
								</div>
							</Col>
							<Col md={6} style={{ marginTop: '20px' }}>

								<div style={{ margin: '20px' }}>
									<h4 style={{ fontFamily: 'Arial, sans-serif', marginBottom: '8px' }}>{myData.attributes.title}  (Demo)</h4>
									<p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px', color: 'red', fontWeight: 'bold' }}>{myData.attributes.price} ฿</p>
									<Accordion>
										<Accordion.Header
											style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
											<span style={{ marginRight: "auto" }}>Video Preview</span>
										</Accordion.Header>
											<Accordion.Body id="course-review">
											{CourseSyllabus.map((val, index) => {
													switch (val.__component) {
														case "xxx":
															return null
														default:
															return<p>{val.title} </p>
													}
												})}
											</Accordion.Body>
									</Accordion>
									<p style={{ fontFamily: 'Arial, sans-serif', marginBottom: '4px', wordWrap: "break-word", lineHeight: '2' }}>
										<span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>รายละเอียดคอร์ส</span> : {myData.attributes.description}
									</p>

								</div>

							</Col>
						</Row>
				</Container>}
		</div>
	);
};

export default Coursedata;
