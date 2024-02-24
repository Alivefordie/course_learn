import React from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Button, Container } from "react-bootstrap";
import '../App.css'

const Cart = () => {
  return (
    <div className="body">
<NavbarTop NavbarLink={NavbarLink} />
      <Container className="cart-container" >
        <h1 style={{ textAlign: "center" }}>myCart</h1>
        <Container className="incart-container">
          <h2>incart</h2>
        </Container>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outline-dark">Payment</Button>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
