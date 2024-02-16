import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [courses1, setCourses1] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/courses/1/like`);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleClick = () => {

        fetchData();
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
};

export default Login;
