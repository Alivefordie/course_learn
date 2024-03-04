import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";

const MyCourses = () => {

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      <Container sm="3" md="4">
        <Row className="mycourse-rows">
          <Col className="inprogress-col">
            <h1 style={{ fontSize: 30 }} className="header-inpro">
              Inprogress
            </h1>
          </Col>
          <Col className="complete-col">
            <h1 style={{ fontSize: 30 }} className="header-com">
              Complete
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyCourses;
