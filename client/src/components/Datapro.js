import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import conf from "../conf/main";
import { Col, Container, Row, Button } from "react-bootstrap";

const Datapro = ({ data }) => {
  const data_1 = data[0];
  const entries = data[1];
  const picture = data[3]
    ? `${conf.url}${data[3]}`
    : "../../public/Profiledf.jpg";
  const id = data[4];

  useEffect(() => {
    console.log(`${conf.url}${data[3]}`);
    console.log("data:", data_1);
    console.log("entries", entries);
    console.log("picture:", picture);
    console.log("id:", id);
  }, [data_1, entries, picture, id]);

  const filteredEntries = entries.filter((entry) => entry.cart === null);
  console.log("filteredEntries:", filteredEntries);

  return (
    <div>
      <Container className="profile-con">
        <Row sm="3" md="4" className="profile-row">
          <Col className="profile-menu" style={{ width: "250px" }}>
            <Container className="option-con">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={picture}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    marginBottom: "20px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <strong>Username:</strong> {data_1.username}
              </p>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <strong>Email:</strong> {data_1.email}
              </p>
              <Link
                to={`./edit-profile/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  <Button variant="outline-light">Edit Profile</Button>
                </p>
              </Link>
            </Container>
          </Col>
          <Col className="profile-info-col" style={{ width: "600px" }}>
            <Row className="info-row">
              <Col className="profile-info">
                <h>Personal Information</h>
              </Col>
              <div class="w-100"></div>
              <Col className="mycourse-col">
                <h>myCourse</h>
              </Col>
            </Row>
          </Col>
          <Col className="my-favorite" style={{ width: "350px" }}>
            <h>myFavorite Course</h>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Datapro;
