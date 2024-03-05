import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col, Container, Row, Form } from "react-bootstrap";
import axios from "axios";
import conf from "../conf/main";

const Datapro = ({ data }) => {
  const [userData, setUserData] = useState(data[0]);
  const [myData, setMyData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const picture = data[3]
    ? `${conf.url}${data[3]}`
    : "../../public/Profiledf.jpg";
  const id = data[4];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${conf.apiUrlPrefix}/my-courses`);
      setMyData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("picture:", picture);
    console.log("id:", id);
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit user data to the server for updating
      await axios.put(`${conf.apiUrlPrefix}/update-profile`, userData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container className="profile-con">
        <Row sm="3" md="4" className="profile-row">
          <Col className="profile-menu" style={{ width: "250px" }}>
            <Container className="option-con">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={picture}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    marginBottom: "20px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>

              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <Link
                to={`./edit-profile/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  <Button variant="dark" className="edit-Btn">Edit Profile</Button>
                </p>
              </Link>
            </Container>
          </Col>
          <Col className="profile-info-col" style={{ width: "600px" }}>
            <Row className="info-row">
              <Col className="profile-info">
                <h1 className="personal-header" style={{ marginTop: "10px" }}>
                  Personal Information
                </h1>
                {isEditing ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="fullname"
                        value={userData.fullname}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDateOfBirth">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formJob">
                      <Form.Label>Job</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter job"
                        name="job"
                        value={userData.job}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter role"
                        name="role"
                        value={userData.role}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                      Save
                    </Button>
                  </Form>
                ) : (
                  <>
                    <p className="text-info-pro">
                      <strong>Full Name:</strong> {userData.fullname}
                    </p>
                    <p className="text-info-pro">
                      <strong>Date of Birth:</strong> {userData.dateOfBirth}
                    </p>
                    <p className="text-info-pro">
                      <strong>Job:</strong> {userData.job}
                    </p>
                    <p className="text-info-pro">
                      <strong>Role:</strong> {userData.role}
                    </p>
                  </>
                )}
              </Col>
              <div className="w-100"></div>
              <Col className="mycourse-col" style={{ marginTop: "10px" }}>
                <h2 className="my-header">myCourse</h2>
                {myData.map((course) => (
                  <Card key={course.id} className="inpro-card">
                    <Card.Body>
                      <Card.Title>{course.attributes.title}</Card.Title>
                      <Card.Text>{course.attributes.description}</Card.Text>
                      <Link to={`./study/${course.id}`}>
                        <Button variant="dark">View Details</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Col>
          <Col className="my-favorite" style={{ width: "350px" }}>
            <h3 className="myfav-header">myFavorite Course</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Datapro;
