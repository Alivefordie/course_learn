import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const Register = () => {

    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', {
                username: 'Strapi user',
                email: 'user@strapi.io',
                password: 'strapiPassword',
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

    return (
        <div>
            <h1>
                <Button variant="outline-dark" onClick={handleRegisterClick}>Register</Button>
            </h1>
        </div>
    );
};

export default Register;
