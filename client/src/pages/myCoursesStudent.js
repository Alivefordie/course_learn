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
import styles from "../css/Student.module.css";
import CourseComponent from "../components/Owner";

const MyCoursesStudent = () => {
    const [coursesVideo, setCoursesVideo] = useState([]);
    
    const fetchOwnerCourses = async () => {
		try {
			const response = await ax.get(`${conf.apiUrlPrefix}/course`);
			const data = await response.json();
			setCoursesVideo(data);
		} catch (error) {
			console.error("Error fetching owner courses:", error);
			// Handle the error if necessary
		}
	};

    useEffect(() => {
        fetchOwnerCourses();
    }, []);

    return(
        <div className = {styles.Bgcolor}>
            <NavbarTop NavbarLink={NavbarLink} />
            <Container class="container" > 
            <Row>
                      <Col  >
                        <div class="container p-3 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif' , borderRadius : "15px" , boxShadow: "2px 2px 8px 4px rgba(0, 0, 0, 0.3)"}}>Study 📚 ✏️</div>
                        <div class="container p-2 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif',borderRadius : "15px"  ,boxShadow: "2px 2px 8px 4px rgba(0, 0, 0, 0.3)"}}>
                            Video 🎬
                            <div style = {{padding : "25px"}}>
                                <video style={{ width: "100%", height: "auto",boxShadow: "2px 2px 8px 4px rgba(0, 0, 0, 0.9)" }} controls>
                                    <source src="movie.mp4" type="video/mp4"/>
                                    <source src="movie.ogg" type="video/ogg"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                     </Col>
                     <Col>
                        <div class="container p-3 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif',boxShadow: "2px 2px 8px 4px rgba(0, 0, 0, 0.3)"}}>
                            mycourses 💼
                        </div>
                        <div class="container p-3 my-3 bg-white text-dark" style = {{fontFamily: '"Righteous", sans-serif',boxShadow: "2px 2px 8px 4px rgba(0, 0, 0, 0.3)"}}>
                            <Card >
                               
                                <Card.Body>
                                    <Card.Title >Display Course</Card.Title>
                                    <CourseComponent/>
                                    <Card.Text style = {{marginTop: "6vw"}}>
                                    Study Progression --🕙--
                                    </Card.Text>
                                    <Link to="/mycourses" class="btn btn-dark">See Progression 👀</Link>
                                </Card.Body>
                            </Card>
                        </div>
                     </Col>      
            </Row>
            </Container>
        </div>
    );
};

export default MyCoursesStudent;
