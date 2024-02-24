import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import '../App.css'

const History = () => {

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      <Container sm='3' md='4'>
        <h1 style={{textAlign: 'center', fontSize: 30}}>History</h1>
        <Row>
          <Col className="week-col">
          <h1 style={{fontSize: 30}}>This week</h1>
          </Col>
          <Col className="month-col">
          <h1 style={{fontSize: 30}}>This month</h1>
          </Col>
          <Col className="year-col"> 
          <h1 style={{fontSize: 30}}>This year</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default History;
