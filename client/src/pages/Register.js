import React, { useState } from "react";
import { Button, Col, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarTop from "../components/NavbarTop";
import styles from "../css/RegisterCss.module.css";

const Register = () => {
  const navigate = useNavigate();
  const initialUser = { email: "", password: "", username: "" };
  const [user, setUser] = useState(initialUser);
  const [securityLevel, setSecurityLevel] = useState("Bad");
  const [color, setColor] = useState("yellow");
  const [loading, setLoading] = useState(true);

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
    const containsNumber = /\d/.test(value);
    const containsCapital = /[A-Z]/.test(value);
    if (containsNumber && containsCapital) {
      setSecurityLevel("Good");
      setColor("green");
    } else {
      setSecurityLevel("Bad");
      setColor("yellow");
    }
  };

  const handleRegisterClick = () => {
    if (user.password !== user.cpassword) {
      alert("Passwords do not match");
      return;
    }
    // Call your registration API here
    console.log("Registering user:", user);
    // Upon successful registration, navigate to desired page
    navigate("/Page1");
  };

  return (
    <div className="body">
      <NavbarTop />
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner />
      </div>
      <div style={{ display: loading ? "none" : "flex" }}>
        <Container className={styles.regisContainer} sm="2">
          <Col className={styles.regisInput}>
            <h1 className={styles.header}>Register</h1>
            <Container>
              <div className="d-flex justify-content-center">

              <img
                src="../register.png"
                alt="Register Icon"
                className={styles.regisImage}
                onLoad={() => setLoading(false)}
                />
                </div>
            </Container>

            <Form className={styles.username}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Email"
                  name="username"
                  value={user.username}
                  onChange={handleUserChange}
                  required
                  className={styles.resize}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                  required
                  className={styles.resize}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={user.password}
                  onChange={handleUserChange}
                  required
                  className={styles.resize}
                />
              </Form.Group>
              <Form.Group controlId="cpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Your Password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleUserChange}
                  required
                  className={styles.resize}
                />
              </Form.Group>
              <div>
                <br />
              </div>
              <div className="text-center">
                <Button
                  onClick={handleRegisterClick}
                  variant="light"
                  type="submit"
                  className=" mt-3"
                  style={{
                    justifyContent: "center",
                    fontWeight: "bold",
                    borderRadius: "15px",
                    width: "17vw",
                  }}
                >
                  Register
                </Button>
              </div>
            </Form>

          </Col>
          <Col className={styles.regisImageContainer}>
            <img
              src="../register-background.png"
              alt="Register Background"
              className={styles.regisBackground}
              onLoad={() => setLoading(false)}
            />
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default Register;
