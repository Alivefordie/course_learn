import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import '../App.css'

const MyCourses = () => {

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      <Container sm='3' md='4'>
        <Row className="mycourse-rows">
          <Col className="inprogress-col">
            <h1 style={{fontSize: 30}}>Inprogress</h1>
          </Col>
          <Col className="complete-col">
            <h1 style={{fontSize: 30}}>Complete</h1>
          </Col>
          <Col className="expired-col">
            <h1 style={{fontSize: 30}}>Expired</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyCourses;
