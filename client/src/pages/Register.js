import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import styles from "../css/RegisterCss.module.css";

const Register = () => {
    const navigate = useNavigate();
    const initialUser = { email: "", password: "", username: "" };
    const [user, setUser] = useState(initialUser);

    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', {
                username: user.username,
                email: user.email,
                password: user.password,
            });
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            navigate('/Page1');
        } catch (error) {
          
            console.log('An error occurred:', error.response);
        }
    };

    const handleRegisterClick = () => {
        registerUser();
    };
    const handleUserChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
          ...currentUser,
          [name]: value,
        }));
      };
    return (
        <div className = {styles.Register}> 
        <NavbarTop />
      <h1 className = {styles.righteous}>Register</h1>
      <Form className= {styles.register}>
        <Form.Group controlId="name" >
          <Form.Label  className= {styles.register2}>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your full name" name = "username" value = {user.username} onChange={handleUserChange}/>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" name = "email" value = {user.email} onChange={handleUserChange}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name = "email" value = {user.password} onChange={handleUserChange}/>
        </Form.Group>
        <Button onClick={handleRegisterClick} variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
    );
};

export default Register;
