import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NavbarTop from "../NavbarTop";
import { Link, useParams } from "react-router-dom";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavbarLink from "../NavbarLink";

const CourseV = () => {
  const { item } = useParams();
  const [course, setCourse] = useState({});
  const [syllabus, setSyllabus] = useState([]);
  const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(false);

  const fetchSyllabus = async () => {
    try {
      const response = await ax.get(
        `http://localhost:1337/api/courses/${item}`
      );
      setCourse(response.data.data);
      setSyllabus(response.data.data.attributes.course_syllabus);
    } catch (error) {
      console.log("Error fetching syllabus:", error);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const test1 = async () => {
    try {
      console.log(syllabus[currentSyllabusIndex]);
      const progressData = {
        data: {
          id: syllabus[currentSyllabusIndex].id,
          value: progress,
        },
      };
      console.log(progressData);
      const response2 = await ax.put(
        `http://localhost:1337/api/progresses/${item}`,
        progressData
      );
      console.log(response2);
    } catch (error) {
      console.log("Error updating progress:", error);
    }
  };

  const handlesyllabusChange = (index) => {
    setCurrentSyllabusIndex(index);
    setProgress(0);
    if (syllabus[index].__component === "activity.video") {
      setVideo(true);
    } else {
      setVideo(false);
    }
  };

  const componentStyle = (syllabus) => {
    switch (syllabus.__component) {
      case "activity.video":
        return (
          <div className="col-md-8">
            <p>Title: {syllabus.title}</p>
            <p>Description: {syllabus.description}</p>
            <ReactPlayer
              url={conf.url + syllabus.videoFile.data[0].attributes.url}
              controls
              playing={true}
              onProgress={({ playedSeconds }) => {
                setProgress(Math.round(playedSeconds));
              }}
            />
            <p>Progress: {progress}</p>
          </div>
        );
      case "activity.text":
        return (
          <div className="col-md-8">
            <p>Title: {syllabus.title}</p>
            <p>Description: {syllabus.description}</p>
          </div>
        );

      case "activity.file":
        return (
          <div className="col-md-8">
            <p>Title: {syllabus.title}</p>
            <p>
              Download:{" "}
              <Link
                to={conf.url + syllabus.material.data[0].attributes.url}
                target="_blank"
              >
                File
              </Link>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      <Container className="study-con" sm="2" md="4">
        <Row>
          <Col className="main-study">
            <Container className="main-video"></Container>
            <div className="Card-course-study"></div>
          </Col>
          <Col className="video-list" style={{ maxWidth: "400px" }}>
            <Row className="video-rows"></Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseV;
