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

import { BsCalendar2Date } from "react-icons/bs";

import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const initialUser = { email: "", password: "", username: "" };
    const [user, setUser] = useState(initialUser);
    const [startDate, setStartDate] = useState(new Date());
    const [securityLevel, setSecurityLevel] = useState("Bad");
    const [color , setColor] = useState("red");

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
        const containsNumber = /\d/.test(value);
        const containsCapital = /[A-Z]/.test(value);
        if (containsNumber && containsCapital) {
            setSecurityLevel("Good");
            setColor("green");
        } else {
            setSecurityLevel("Bad");
            setColor("red");
        }
      };
    return (
        <div>
        <NavbarTop />
        <div className={styles.backgroundContainer}>
            <img
                src="../register-background.png"
                alt="Register Background"
                className={styles.registerImage}
            />
            <div className={styles.formContainer}>
            <h1 className = {styles.righteous}>Register</h1>
            <Form className= {styles.register}>
        <Form.Group controlId="name" >
          <Form.Label  >Surname</Form.Label>
          <Form.Control type="text" placeholder="your fullname" name = "username" value = {user.username} onChange={handleUserChange} className= {styles.register2}/>
        </Form.Group>

        <Form.Group controlId="name" >
          <Form.Label  >Lastname</Form.Label>
          <Form.Control type="text" placeholder="your lastname" className= {styles.register2}/>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="example@email.com" name = "email" value = {user.email} onChange={handleUserChange}  className= {styles.register4}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name = "password" value = {user.password} onChange={handleUserChange} className= {styles.register2}/>
        </Form.Group>
        <div >
    Security Level :
    <h1 style={{color: color}}>{securityLevel}</h1>
</div>

        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" name = "cpassword" value = {user.cpassword} onChange={handleUserChange} className= {styles.register2}/>
        </Form.Group>
        <div>
           <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" className={styles.register_check}/>
           <label class="form-check-label" for="flexCheckDefault" className = {styles.resize}>
    I agree to the 
  </label>
  <label class="form-check-label" for="flexCheckDefault" className = {styles.white} >
    Terms & Condition
  </label>
  <label class="form-check-label" for="flexCheckDefault" className = {styles.resize} >
  and
  </label>
  <label class="form-check-label" for="flexCheckDefault" className = {styles.white} >
    Privacy Policy
  </label>
        </div>
        <Button onClick={handleRegisterClick} variant="light" type="submit" className = {styles.register_button}>
          Register
        </Button>
      </Form>
      
       
            </div>
        </div>
         <div className = {styles.footer}></div>
    </div>
    
    );
};

export default Register;