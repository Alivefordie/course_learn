import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import conf from "../conf/main";
import { Col, Container, Row, Button, Card } from "react-bootstrap";

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
        <Row className="profile-row">
          <Col sm={12} md={4} lg={3} className="profile-menu">
            <Container className="option-con">
              <p>picture</p>
              <p>username</p>
              <p>email</p>
              <Button variant="dark">Edit Profile</Button>
            </Container>
          </Col>
          <Col sm={12} md={8} lg={6} className="profile-info-col">
            <Row className="info-row">
              <Col className="profile-info">
                <h>Profile Information</h>
              </Col>
              <div class="w-100"></div>
              <Col className="mycourse-col">
                <h>myCourse</h>
                <Container className="myc-items">
                  <Card>
                    <Card.title></Card.title>
                    <Card.body></Card.body>
                  </Card>
                </Container>
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={12} lg={3} className="my-favorite">
            <h>myFavorite Course</h>
            <Container className="myFav-items">
              <Card>
                <Card.title></Card.title>
                <Card.body></Card.body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Datapro;
