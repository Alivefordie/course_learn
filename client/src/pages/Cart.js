//จัดเลอร์เยอะโอเค เหลือเพิ่มเข้าไป
import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Button, Card, Col, Container, Row, } from "react-bootstrap";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import Spinner from "../components/Spinner";
import AddCart from "../components/addcart";

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      const response = await ax.get(conf.findanything);
      const filteredData = response.data.entries.filter(
        (entry) => entry.cart !== null
      );
      setFilter(filteredData);
      setData(filteredData.map((entry) => entry.course));
      calculateTotalPrice(filteredData.map((entry) => entry.course));
      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      setLoading(false);
    }
  };

  const payment = () => {
    navigate("/payment");
  };

  const calculateTotalPrice = (courses) => {
    const totalPrice = courses.reduce((acc, course) => {
      if (course.price) {
        return acc + course.price;
      }
      return acc;
    }, 0);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      {loading ? (
        <Spinner />
      ) : (
        <Container className="cart-container">
          <Container className="incart-container">
            <h1 className="header-cart">My Cart</h1>
            <Row className="g-4">
              <Col md={6}>
                {filter.map((item) => (
                  <Card
                    className="d-flex flex-row"
                    style={{ marginTop: "15px", marginBottom: "15px", marginLeft: "15px" }}
                    key={item.id}
                  >
                    <div
                      onClick={() => navigate(`/courses/${item.course.id}`)}
                      style={{ cursor: "pointer" }}
                      className="image-col"
                    >
                      <Card.Img
                        className="course-image"
                        variant="left"
                        src={conf.url + item.course.picture.url}
                      />
                    </div>
                    <div className="body-col">
                      <Card.Body
                        onClick={() => navigate(`/courses/${item.course.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Title>{item.course.title}</Card.Title>
                        <Card.Text>Details</Card.Text>
                        <Card.Text className="m-0">
                          เนื้อหา {item.course.description.slice(0, 55)}...
                        </Card.Text>
                        <Card.Text className="m-0">
                          ระยะเวลา {item.course.duration}
                        </Card.Text>
                      </Card.Body>
                    </div>
                    <div style={{
                      margin: "20px", display: "flex", justifyContent: "flex-end"
                    }} >
                      <AddCart course={item} />
                    </div>
                  </Card>
                ))}
              </Col>
              <Col md={6}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <Button
                    variant="outline-dark"
                    onClick={payment}
                    className="pay-button mb-3"
                  >
                    Proceed to Payment
                  </Button>
                  <div className="total-price">
                    <p className="mb-0">Total Price: {totalPrice}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <div></div>
        </Container>
      )}
    </div>
  );
};

export default Cart;
