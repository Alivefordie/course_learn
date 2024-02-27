import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fillter, setFillter] = useState([]);

  const fetchData = async () => {
    try {
      const jwtToken = sessionStorage.getItem('auth.jwt');
      if (!jwtToken) {
        console.error('JWT token not found.');
        return;
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      const response = await axios.get("http://localhost:1337/api/users/me?populate[entries][populate][course]=*");
      const filteredData = response.data.entries.filter(entry => entry.cart !== null);
      setFillter(filteredData);
      setData(filteredData.map(entry => entry.course));
      calculateTotalPrice(filteredData.map(entry => entry.course));
    } catch(error) {
      console.error('Error occurred:', error);
    }
  }

  const payment = () => {
    navigate("/payment");
  }

  const calculateTotalPrice = (courses) => {
    const totalPrice = courses.reduce((acc, course) => {
      if (course.price) {
        return acc + course.price;
      }
      return acc;
    }, 0);
    setTotalPrice(totalPrice);
  }

  useEffect(() => {
    fetchData();
  }, []);

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
                {fillter.map((item) => (
                  <div key={item.id}>
                    <p>Title: {item.course.title}</p>
                    <p>Price: {item.course.price}</p>
                  </div>
                ))}
              </Container>
            </Col>
            <Col className="price-col" sm={2}>
              <p className="total-price">Total Price</p>
              <Container className="price-cart">
                <p>{totalPrice}</p>
              </Container>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outline-dark" onClick={payment} className="pay-but">Payment</Button>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Cart;
