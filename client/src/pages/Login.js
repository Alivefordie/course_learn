import React, { useState, useContext } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from "../css/LoginCss.module.css";
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
        <div className={styles.test01}>
            <div className={`container ${styles.leftAlign}`}>
                <div className={styles.test}>
                    <Form onSubmit={handleSubmit} className="rounded p-4 border shadow">
                        <h2>Login </h2>
                        <img src="/cart.png" alt="Cart" />
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
                        <div className={styles.test123}>
                            <span>Forgot Password</span>
                            {/* <span onClick={goto_register}>Don't have Account?</span> */}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
