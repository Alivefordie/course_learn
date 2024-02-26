import React, { useState, useContext } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// import Register from "./Register";
import NavbarTop from "../components/NavbarTop";
import { AuthContext } from "../context/AuthContext";
import styles from "../css/LoginCss.module.css";


const Login = () => {
  
  
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(username, password, navigate);
            navigate("/")
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div >
            <NavbarTop/>
            <div style={{ display: "flex"}}>
                <div >
                <img
                src="../login-background.png"
                alt="Register Background"
                className={styles.loginImage}
                />
                    <Form onSubmit={handleSubmit} className = {styles.username} >
                       
                        <Form.Group controlId="username">
                            <Form.Label >Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className = {styles.resize}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label >Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className = {styles.resize}
                            />
                        </Form.Group>
                        <div>
                            <br/>
                            
                        </div>
                        <div className={styles.choice}>
                            <span className = {styles.forgetpassword}>
                                Forgot Password
                                <h style = {{marginLeft : "255px"}}>Don't have Account?</h>
                            </span>
                            {/* <span onClick={goto_register}>Don't have Account?</span> */}
                        </div>
                        <Button variant="light" type="submit" style = {{marginLeft: "135px" ,marginTop: "225px", fontWeight: "bold",borderRadius: "15px",width: "17vw"}}>
                                Login
                            </Button>
                    </Form>
                </div>
                    
            </div>
        </div>
    );
};

export default Login;
