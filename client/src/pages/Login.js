import { useContext, useState } from "react";
import { Button, Col, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NavbarTop from "../components/NavbarTop";
import styles from "../css/LoginCss.module.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="body">
      <NavbarTop />
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner />
      </div>
      <div style={{ display: loading ? "none" : "flex" }}>
        <Container className={styles.loginContainer} sm="2">
          <Col className={styles.loginInput}>
            <h1 className={styles.header}>Login</h1>
            <Container className={styles.loginImage}>
              <img
                src="../login.png"
                alt="Register Background"
                className={styles.loginImage}
                onLoad={() => setLoading(false)}
              />
            </Container>
            <Form onSubmit={handleSubmit} className={styles.username}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={styles.resize}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.resize}
                />
              </Form.Group>
              <div>
                <br />
              </div>
              <div className="d-flex justify-content-between">
                <span
                  className=" d-flex "
                  onClick={() => navigate("/ForgotPassword")}
                  style={{
                    textDecorationLine: "underline",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password
                </span>
                <span
                  onClick={() => navigate("/register")}
                  style={{
                    textDecorationLine: "underline",
                    cursor: "pointer",
                  }}
                >
                  Don't have Account?
                </span>
              </div>
              <div className="text-center">
                <Button
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
                  Login
                </Button>
              </div>
            </Form>
          </Col>
          <Col className={styles.loginImageContainer}>
            <img
              src="../login-background.png"
              alt="Login Background"
              className={styles.loginBackground}
              onLoad={() => setLoading(false)}
            />
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default Login;
