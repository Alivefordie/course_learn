import React from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";

const Cart = () => {
  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      <Container className="cart-container">
        <Container className="incart-container">
          <h1 style={{ textAlign: "center" }}>myCart</h1>
          <Row>
          <Col className="order-col" sm={8}>
            <p>Order</p>
            <Container className="item-cart">
              <p>
                item 1
              </p>
            </Container>
          </Col>
          <Col className="price-col" sm={2}>
            <p>Price</p>
            <Container className="price-cart">
              <p>
                2,990
              </p>
            </Container>
          </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center"}}>
          <Button variant="outline-dark" className="pay-but">Payment</Button>
        </div>
        </Container>
        
      </Container>
    </div>
  );
};

export default Cart;
