import React from "react";
import NavbarTop from "../components/NavbarTop";
import { Button, Container, Row } from "react-bootstrap";
const Cart = () => {
  return (
    <div>
      <NavbarTop />
      <Container className="cart-container">
        <h1 style={{ textAlign: "center" }}>myCart</h1>
        <Container className="incart-container">
          <h2>incart</h2>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outline-dark">Payment</Button>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
