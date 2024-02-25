import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";
import axios from "axios";

const Cart = () => {
const [cart,setdata] = useState([])

  const fect = async() => {
    try {
      const jwtToken = sessionStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.error('JWT token not found.');
        return;
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      const response = await axios.get("http://localhost:1337/api/users/me?populate[courses]=*");
      console.log(response.data.courses);
      setdata(response.data.courses);
    } catch(error) {
      console.error('Error occurred:', error);
    }
  }
  
  
  useEffect(()=>{
    fect()
  },[])

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outline-dark" className="pay-but">Payment</Button>
          </div>
        </Container>

      </Container>
    </div>
  );
};

export default Cart;
