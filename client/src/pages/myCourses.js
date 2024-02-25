import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import "../App.css";
import { Link } from "react-router-dom";

const MyCourses = () => {
  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      <Container sm="3" md="4">
        <Row className="mycourse-rows">
          <Col className="inprogress-col">
            <h1 style={{ fontSize: 30 }}>Inprogress</h1>
            <Container className="item-inpro">
              <Card style={{ width: "100%" }} className="d-flex flex-row">
                <div className="image-col">
                  <Card.Img
                    className="course-image"
                    variant="left"
                    src="books-pile.png"
                  />
                </div>
                <div className="body-col">
                  <Card.Body>
                    <Card.Title>Course Title</Card.Title>
                    <Card.Text>details</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Container>
          </Col>
          <Col className="complete-col">
            <h1 style={{ fontSize: 30 }}>Complete</h1>
            <Container className="item-complete">
              <Card style={{ width: "100%" }} className="d-flex flex-row">
                <div className="image-col">
                  <Card.Img
                    className="course-image"
                    variant="left"
                    src="books-pile.png"
                  />
                </div>
                <div className="body-col">
                  <Card.Body>
                    <Card.Title>Course Title</Card.Title>
                    <Card.Text>details</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Container>
          </Col>
          <Col className="expired-col">
            <h1 style={{ fontSize: 30 }}>Expired</h1>
            <Container className="item-expired">
              <Card style={{ width: "100%" }} className="d-flex flex-row">
                <div className="image-col">
                  <Card.Img
                    className="course-image"
                    variant="left"
                    src="books-pile.png"
                  />
                </div>
                <div className="body-col">
                  <Card.Body>
                    <Card.Title>Course Title</Card.Title>
                    <Card.Text>details</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyCourses;
