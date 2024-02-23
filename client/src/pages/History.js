import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import '../App.css'

const History = () => {

  return (
    <div>
      <NavbarTop NavbarLink={NavbarLink} />
      <Container sm='3' md='4'>
        <h1>History</h1>
      </Container>
    </div>
  );
}

export default History;
