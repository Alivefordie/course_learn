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
import LoginFirst from "../PleaseLogin";

const CourseV = () => {
  const { item } = useParams();
  const [course, setCourse] = useState({});
  const [syllabus, setSyllabus] = useState([]);
  const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(false);
  const [duration, setDuration] = useState(0);
  const [show, setshow] = useState(false);
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
      if (currentSyllabusIndex <= syllabus.lenght) {
        const progressData = {
          data: {
            id: syllabus[currentSyllabusIndex].id,
            value: progress,
          },
        };
        await ax.put(
          `${conf.apiUrlPrefix}/progresses/${item}`,
          progressData
        );
      }
      setshow(true)
    } catch (error) {
      console.log("Error updating progress:", error);
    }
  };

  const handlesyllabusChange = (index) => {
    setCurrentSyllabusIndex(index);
    setProgress(0);
    setDuration(0)
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
            <p className="data-text">Title: {syllabus.title}</p>
            <p className="data-text">Description: {syllabus.description}</p>
            <ProgressBar
              now={progress}
              label={`${progress}%`}
              className="progressbar-data"
              variant="danger"
            />
            ;
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
      <LoginFirst
        showLoginFirstModal={show}
        closeModal={() => setshow(false)}
        message={"saved"}
      />
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
                <ListGroup as="ui" className="list-group-item-danger">
                  {syllabus.map((item, index) => (
                    <ListGroup.Item
                      as="li"
                      key={index}
                      // className={`list-group-item list-group-item-action ${index === currentSyllabusIndex ? "active" : "" }`}
                      className={` w-100 ${index === currentSyllabusIndex ? "active" : ""
                        }`}
                      onClick={() => handlesyllabusChange(index)}
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {(duration != 0 || video || progress != 0) && (
                  <Button
                    className="save-pro-Btn"
                    variant="dark"
                    onClick={test1}
                  >
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
