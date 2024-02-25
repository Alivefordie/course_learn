import React from "react";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/LoginCss.module.css";

const Login = () => {
    const navigate = useNavigate();
    const initialUser = { password: "", username: "" };
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
        try {
            let response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: user.username,
                password: user.password,
            });
            console.log(response.data);
            const jwtToken = response.data.jwt;
            sessionStorage.setItem('jwtToken', jwtToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

            const userResult = await axios.get('http://localhost:1337/api/users/me?populate=role');

            if (userResult.data.role) {
                const Rolename = userResult.data.role.name;
                sessionStorage.setItem('Rolename', Rolename);
                if (Rolename === 'Instructors') {
                    navigate('/Instructors');
                } else if (Rolename === '') {
                    navigate('/');
                }
            }
        } catch (error) {
            console.log('Error occurred:', error);
            console.log('Wrong username & password');
            setSubmitEnabled(true);
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
                            <br/>
                            <Button variant="primary" type="submit" disabled={!submitEnabled}>
                                Login
                            </Button>
                        </div>
                        <div className={styles.test123}>
                            <span>Forgot Password</span>
                            <span>Don't have Account?</span>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
