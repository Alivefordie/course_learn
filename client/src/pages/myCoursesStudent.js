import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import "../App.css";
import Spinner from "../components/Spinner";
import fetchOwnerCourses from "../components/Owner";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Link } from "react-router-dom";
import styles from "../css/Student.module.css" ;



const MyCoursesStudent = () => {
    return(
<<<<<<< HEAD
        
        <div className = {styles.Bgcolor}>
            <NavbarTop NavbarLink={NavbarLink} />
            <Container class="container" > 
            <Row>
                      <Col  >
                        <div class="container p-3 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif'}}>Study 📚 ✏️</div>
                        <div class="container p-3 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif'}}>
                            Video
                            <div>
                                <video width="auto" height="auto" controls>
                                    <source src="movie.mp4" type="video/mp4"/>
                                    <source src="movie.ogg" type="video/ogg"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                     </Col>
                     <Col>
                        <div class="container p-3 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif'}}>mycourses</div>
                     </Col>      
            </Row>
            </Container>
=======
        <div>
            <NavbarTop NavbarLink={NavbarLink}/>
            
>>>>>>> 9ae657ee78c8d8b93627b7ebe9ba8c7b89f8b990
        </div>
    );
};

export default MyCoursesStudent;

