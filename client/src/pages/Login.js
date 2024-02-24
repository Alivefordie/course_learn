    import React from "react";
    import { Form, Button, Container, Row, Col } from 'react-bootstrap';
    import axios from 'axios';
    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import NavbarTop from "../components/NavbarTop";


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
                const jwtToken = response.data.jwt; // Corrected variable name
                sessionStorage.setItem('jwtToken', jwtToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

                const userResult = await axios.get('http://localhost:1337/api/users/me?populate=role');

                if (userResult.data.role) {
                    const Rolename = userResult.data.role.name;
                    sessionStorage.setItem('Rolename', Rolename);
                    if (Rolename === 'Instructors') {
                        navigate('/page1');
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
            <div className="body" style={{ display: "flex", flexDirection: "column"}}>
        <NavbarTop/>
        <div style={{ display: "flex", flexGrow: 1}}>
            <div className="form">
                <Form onSubmit={handleSubmit} >
                    <h2 style={{ display: "flex", justifyContent: "center"}}>Login</h2>
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
                    <Button variant="primary" type="submit" disabled={!submitEnabled}>
                        Submit
                    </Button>
                </div>
                </Form>
            </div>
            <div className="form">
            </div>
        </div>
    </div>
        );
    };

    export default Login;
