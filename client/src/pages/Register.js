import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Register = () => {
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
        <div>
            <h1>
            <div>
          <h2 >Sign up:</h2>
          <Form>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Please Enter Username"
            />
          </Form>
          <Form>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="Enter your email"
            />
          </Form>
          <Form>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              placeholder="Enter password"
            />
          </Form>
        </div>
                <button variant="outline-dark" onClick={handleRegisterClick}>Register</button>
            </h1>
        </div>
    );
};

export default Register;
