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

const MyCourses = () => {
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
            {ownerCourses.map((course) => (
              <Col key={course.id} className="owner-course-col">
                <h1 style={{ fontSize: 30 }}>{course.name}</h1>
              </Col>
            ))}

            <Col className="inprogress-col">
              <h1 style={{ fontSize: 30 }} className="header-inpro">
                Inprogress
              </h1>
              {data.map((course) => (
                <Card key={course.id} className="inpro-card">
                  <Card.Body>
                    <Card.Title>{course.attributes.title}</Card.Title>
                    <Card.Text>{course.attributes.description}</Card.Text>
                    <Link to={`./study/${course.id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col className="complete-col">
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
