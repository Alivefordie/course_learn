import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import "../App.css";
import Spinner from "../components/Spinner";
import fetchOwnerCourses from "../components/Owner";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Link } from "react-router-dom";


// import { useContext, useEffect, useState } from "react";
// import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import ax from "../conf/ax";
// import conf from "../conf/main";
import { AuthContext } from "../context/AuthContext";




const MyCourses = () => {
  const navigate = useNavigate()
  const [loadingRegularCourses, setLoadingRegularCourses] = useState(true);
  const [data, setdata] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ax.get(`${conf.apiUrlPrefix}/my-courses`);
      setdata(response.data.data);
      setLoadingRegularCourses(false)
    } catch (error) {
      console.log(error);
      setLoadingRegularCourses(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Simulate regular courses fetching
  useEffect(() => {
    // You can replace this with actual fetching logic if required
    setTimeout(() => {
      setLoadingRegularCourses(false);
    }, 2000);
  }, []);

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      { loadingRegularCourses ? (
        <Spinner />
      ) : (
        <Container sm="2" md="4">
          <Row className="mycourse-rows">

            <Col className="inprogress-col scrollbar ">
              <h1 style={{ fontSize: 30 }} className="header-inpro">
                Inprogress
              </h1>
              {data.map((course) => {
                // console.log(course)
                const p = course.attributes.course_syllabus.map((Sylla) => Sylla?.progresses?.data[0]?.attributes?.value)
                const pr = p.length > 0 ? p.reduce((ac, v) => { return ac + v }, 0) : 0
                if ((pr ? (pr / p.length) : 0) < 100) {
                  return <Card className="d-flex flex-row inpro-card" key={course.id} style={{ marginTop: "15px" }}>
                    <div
                      onClick={() => navigate(`/mycourses/study/${course.id}`)}
                      style={{ cursor: "pointer" }}
                      className="image-col">
                      <Card.Img className="course-image" variant="left" src={conf.url + course.attributes.picture.data.attributes.url} />
                    </div>
                    <div className="body-col">
                      <Card.Body
                        onClick={() => navigate(`/mycourses/study/${course.id}`)}
                        style={{ cursor: "pointer" }}>
                        <Card.Title>{course.attributes.title}</Card.Title>
                        <Card.Text className="m-0">ระยะเวลา {course.attributes.duration}</Card.Text>
                        <Card.Text className="m-0">ครู {course.attributes.owner.data.attributes.username}</Card.Text>

                        <ProgressBar now={pr / p.length} label={`${pr ? pr / p.length : 0}%`} />
                      </Card.Body>
                    </div>
                  </Card>
                }
              }
              )}
            </Col>
            <Col className="complete-col scrollbar">
              <h1 style={{ fontSize: 30 }} className="header-com">
                Complete
              </h1>
              {data.map((course) => {
                const p = course.attributes.course_syllabus.map((Sylla) => Sylla?.progresses?.data[0]?.attributes?.value)
                const pr = p.length > 0 ? p.reduce((ac, v) => { return ac + v }, 0) : 0
                if (pr / p.length >= 100) {
                  return <Card className="d-flex flex-row inpro-card" key={course.id} style={{ marginTop: "15px" }}>
                    <div
                      onClick={() => navigate(`/mycourses/study/${course.id}`)}
                      style={{ cursor: "pointer" }}
                      className="image-col">
                      <Card.Img className="course-image" variant="left" src={conf.url + course.attributes.picture.data.attributes.url} />
                    </div>
                    <div className="body-col">
                      <Card.Body
                        onClick={() => navigate(`/mycourses/study/${course.id}`)}
                        style={{ cursor: "pointer" }}>
                        <Card.Title>{course.attributes.title}</Card.Title>
                        <Card.Text className="m-0">ระยะเวลา {course.attributes.duration}</Card.Text>
                        <Card.Text className="m-0">ครู {course.attributes.owner.data.attributes.username}</Card.Text>

                        <ProgressBar now={pr / p.length} label={`${pr ? pr / p.length : 0}%`} />
                      </Card.Body>
                    </div>
                  </Card>
                }
              }
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MyCourses;
