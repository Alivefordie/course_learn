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

const MyCourses = () => {
  const [ownerCourses, setOwnerCourses] = useState([]);
  const [loadingOwnerCourses, setLoadingOwnerCourses] = useState(true);
  const [loadingRegularCourses, setLoadingRegularCourses] = useState(true);

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
            {/* Render Owner Courses */}
            {ownerCourses.map((course) => (
              <Col key={course.id} className="owner-course-col">
                <h1 style={{ fontSize: 30 }}>{course.name}</h1>
                {/* Add more details or components for owner courses if needed */}
              </Col>
            ))}

            {/* Regular Courses */}
            <Col className="inprogress-col">
              <h1 style={{ fontSize: 30 }} className="header-inpro">
                Inprogress
              </h1>
              {/* Add your regular courses rendering logic here */}
            </Col>
            <Col className="complete-col">
              <h1 style={{ fontSize: 30 }} className="header-com">
                Complete
              </h1>
              {/* Add your regular courses rendering logic here */}
            </Col>
            <Col className="expired-col">
              <h1 style={{ fontSize: 30 }} className="header-exp">
                Expired
              </h1>
              {/* Add your regular courses rendering logic here */}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MyCourses;
