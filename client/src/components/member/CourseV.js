import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NavbarTop from "../NavbarTop";
import { Link, useParams } from "react-router-dom";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavbarLink from "../NavbarLink";
import ProgressBar from "react-bootstrap/ProgressBar";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ListGroupItem from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

const CourseV = () => {
  const { item } = useParams();
  const [course, setCourse] = useState({});
  const [syllabus, setSyllabus] = useState([]);
  const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(false);
  const [duration, setDuration] = useState(0);

  const fetchSyllabus = async () => {
    try {
      const response = await ax.get(
        `http://localhost:1337/api/courses/${item}`
      );
      setCourse(response.data.data);
      console.log(response);
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
          <Container className="main-video">
            <div className="d-flex justify-content-center mx-auto">
              <ReactPlayer
                url={conf.url + syllabus.videoFile.data[0].attributes.url}
                controls
                playing={true}
                onDuration={(d) => setDuration(d)}
                onProgress={({ playedSeconds }) => {
                  setProgress(Math.round((playedSeconds / duration) * 100));
                }}
              />
            </div>
          </Container>
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

  const ShotCard = (syllabus) => {
    switch (syllabus.__component) {
      case "activity.video":
        return (
          <>
            <p>Title: {syllabus.title}</p>
            <p>Description: {syllabus.description}</p>
            <ProgressBar now={progress} label={`${progress}%`} />;
          </>
        );
      // case "activity.text":
      //   return (
      //     <div className="col-md-8">
      //       <p>Title: {syllabus.title}</p>
      //       <p>Description: {syllabus.description}</p>
      //     </div>
      //   );

      // case "activity.file":
      //   return (
      //     <div className="col-md-8">
      //       <p>Title: {syllabus.title}</p>
      //       <p>
      //         Download:{" "}
      //         <Link
      //           to={conf.url + syllabus.material.data[0].attributes.url}
      //           target="_blank"
      //         >
      //           File
      //         </Link>
      //       </p>
      //     </div>
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="body">
      {/* {console.log(course)} */}
      <NavbarTop NavbarLink={NavbarLink} />

      {syllabus.length > 0 && (
        <Container className="study-con" sm="2" md="4">
          <Row>
            <Col className="main-study">
              {componentStyle(syllabus[currentSyllabusIndex])}
              <div className="Card-course-study">
                {ShotCard(syllabus[currentSyllabusIndex])}
              </div>
            </Col>
            <Col className="video-list" style={{ maxWidth: "400px" }}>
              <Row className="video-rows">
                <ListGroup as="ui">
                  {syllabus.map((item, index) => (
                    <ListGroup.Item
                      as="li"
                      key={index}
                      // className={`list-group-item list-group-item-action ${index === currentSyllabusIndex ? "active" : "" }`}
                      className={` w-100 ${
                        index === currentSyllabusIndex ? "active" : ""
                      }`}
                      onClick={() => handlesyllabusChange(index)}
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {video && (
                  <Button variant="dark" onClick={test1}>
                    Save progress
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default CourseV;
