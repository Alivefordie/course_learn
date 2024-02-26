import React, { useState, useContext } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from "../css/LoginCss.module.css";
// import Register from "./Register";
import NavbarTop from "../components/NavbarTop";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  
  
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(username, password, navigate);
            navigate("/cart")
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div className={styles.body}>
            <NavbarTop/>
            <div style={{ display: "flex"}}>
                <div className={styles.form}>
                    <Form onSubmit={handleSubmit} >
                        <div className={styles.center}>
                        <h2 className={styles.font}>Login </h2>
                        <img src="/cart.png" alt="Cart" />
                        </div>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div>
                            <br/>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                        <div className={styles.choice}>
                            <span>Forgot Password</span>
                            {/* <span onClick={goto_register}>Don't have Account?</span> */}
                        </div>
                    </Form>
                </div>
                    <div className={styles.form}>
                    </div>
            </div>
        </div>
    );
};

export default Login;
