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
  const [ownerCourses, setOwnerCourses] = useState([]);
  const [loadingOwnerCourses, setLoadingOwnerCourses] = useState(true);
  const [loadingRegularCourses, setLoadingRegularCourses] = useState(true);
  const [data, setdata] = useState([])

  const fetchData = async () => {
    try {
      const response = await ax.get(`${conf.apiUrlPrefix}/my-courses`);
      setdata(response.data.data)
      console.log(response.data.data)
    }
    catch (error) {
      console.log()
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  // Fetch owner courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOwnerCourses();
        setOwnerCourses(data);
        setLoadingOwnerCourses(false);
      } catch (error) {
        console.error("Error fetching owner courses data:", error);
        setLoadingOwnerCourses(false);
      }
    };

    fetchData();

    // Cleanup function to cancel any ongoing fetches if the component unmounts
    return () => {
      // Cleanup logic if needed
    };
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
      {loadingOwnerCourses || loadingRegularCourses ? (
        <Spinner />
      ) : (
        <Container sm="3" md="4">
          <Row className="mycourse-rows">

            <Col className="inprogress-col scrollbar">
              <h1 style={{ fontSize: 30 }} className="header-inpro">
                Inprogress
              </h1>
              {data.map((course) => {
                console.log(course)
                return <Card className="d-flex flex-row inpro-card" key={course.id} style={{ marginTop: "15px" }}>
                   <div
                        onClick={() => navigate(`/mycourse/${course.id}`)}
                        style={{ cursor: "pointer" }}
                        className="image-col">
                        <Card.Img className="course-image" variant="left" src={conf.url+course.attributes.picture.data.attributes.url } />
                    </div>
                    <div className="body-col">
                        <Card.Body
                            onClick={() => navigate(`/mycourse/${course.id}`)}
                            style={{ cursor: "pointer" }}>
                            <Card.Title>{course.attributes.title}</Card.Title>
                            <Card.Text className="m-0">ระยะเวลา {course.attributes.duration}</Card.Text>
                            <Card.Text className="m-0">ครู {course.attributes.owner.data.attributes.username}</Card.Text>
                        </Card.Body>
                    </div>
                </Card>}
              )}
            </Col>
            <Col className="complete-col scrollbar">
              <h1 style={{ fontSize: 30 }} className="header-com">
                Complete
              </h1>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MyCourses;
