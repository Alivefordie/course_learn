import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const initialUser = {  password: "", username: "" };
    const [user, setUser] = useState(initialUser);
    const [submitEnabled, setSubmitEnabled] = useState(true);

    const handleUserChange = ({ target }) => {
        const { id, value } = target;
        setUser((currentUser) => ({
          ...currentUser,
          [id]: value,
        }));
      };

    const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault();
        setSubmitEnabled(false);
        try{
            let response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: user.username,
                password: user.password,
            });
            console.log(response);
            if (response.data){
            navigate('/Page1');}
            
        } catch (error){
            console.log(error);
            console.log('wrong username & password');
            setSubmitEnabled(true);
        }
    }

    return (
        <div className="container"> 
        <Form onSubmit={handleSubmit} className="rounded p-4 border shadow">
        <h2>Sign In</h2>
        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter username"
                value={user.username}
                onChange={handleUserChange}
                required
            />
        </Form.Group>

        <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={handleUserChange}
                required
            />
        </Form.Group>

        <div>
            <Button variant="primary" type="submit" disabled={!submitEnabled} >
                Submit
            </Button>
        </div>
    </Form>
    </div>
    );
};

export default Login;
