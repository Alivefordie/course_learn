import React, { useEffect, useState } from "react";
import axios from "axios";
import Toprank from "../components/Toprank";
import Common from "../components/Common";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../App.css";

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
        const response = await axios.get("http://localhost:1337/api/courses");
        const coursesData = response.data.data;
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storedJwtToken, storedRolename]);

  return (
    <div>
      <NavbarTop NavbarLink={NavbarLink} />
      <Container className="page1-container" sm="3" md="4">
        <Row className="page1-rows">
          <Col
            id="top-rank-course"
            className="top-rank-course"
            data-bs-spy="scroll"
            data-bs-target="#top-rank-course"
            data-bs-offset="0"
          >
            <h3 className="header-toprank">
              <img
                src="../fire.png"
                style={{ width: "30px", height: "30px" }}
                alt="Fire Icon"
                className="fire-image"
              />
              Top 3 ranks
            </h3>

            <div
              className="item-top overflow-y-scroll"
              style={{ maxHeight: "500px" }}
            >
              <Toprank data={courses} />
            </div>
          </Col>

          <Col
            id="common-col"
            className="common-col"
            data-bs-spy="scroll"
            data-bs-target="#common-col"
            data-bs-offset="0"
          >
            <h3 className="header-common">
              <img
                src="../book.png"
                style={{ width: "30px", height: "30px" }}
                alt="Common Icon"
                className="common-image"
              />
              Common
            </h3>

            <div
              className="item-common overflow-y-scroll"
              style={{ maxHeight: "500px" }}
            >
              <Common data={courses} />
            </div>
          </Col>

          <Col
            id="newest-col"
            className="newest-col"
            data-bs-spy="scroll"
            data-bs-target="#newest-col"
            data-bs-offset="0"
          >
            <h3 className="header-newest">
              <img
                src="../newest.png"
                style={{ width: "40px", height: "40px" }}
                alt="Newest Icon"
                className="newest-image"
              />
              Newest
            </h3>
            <div
              className="item-newest overflow-y-scroll"
              style={{ maxHeight: "500px" }}
            >
              <Common data={courses} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllCourse;
