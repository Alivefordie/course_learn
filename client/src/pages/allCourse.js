import React, { useEffect, useState } from "react";
import axios from "axios";
import Toprank from "../components/Toprank";
import Common from "../components/Common";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Col, Container, Row } from "react-bootstrap";
import '../App.css'

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const storedJwtToken = sessionStorage.getItem("jwtToken");
  const storedRolename = sessionStorage.getItem("Rolename");

  // Set default headers
  useEffect(() => {
    if (storedJwtToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedJwtToken}`;
    }
  }, [storedJwtToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedJwtToken && storedRolename === "Public") {
          const response = await axios.get(
            "http://localhost:1337/api/courses"
          );
          const coursesData = response.data.data;
          setCourses(coursesData);
        } else {
          console.log("User is not authorized to view this data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storedJwtToken, storedRolename]);

  return (
    <div>
    <NavbarTop NavbarLink={NavbarLink} />
    <Container className="page1-continer" sm="3" md='4'>
      <Row className="page1-rows">
        <Col className="top-rank-course">
          <h3 className="header-toprank">Top 3 ranks</h3>
          <Toprank data={courses} />
        </Col>

        <Col className="common-col">
          <h3 className="header-common">Common</h3>
          <Common data={courses} />
        </Col>

        <Col className="newest-col">
          <h3 className="header-newest">Newest</h3>
          <Common data={courses} />
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default AllCourse;
