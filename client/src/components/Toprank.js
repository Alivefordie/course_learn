import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Toprank = ({ data }) => {
  useEffect(() => {
    console.log("Toprank", data);
  }, [data]);

  return (
    <div>
      {data
        .sort((a, b) => b.attributes.likeCount - a.attributes.likeCount)
        .slice(0, 3)
        .map((item) => (
          <Card
            key={item.id}
            style={{ width: "100%" }}
            className="d-flex flex-row mb-3"
          >
            <div className="image-col">
              <Card.Img
                className="course-image"
                variant="left"
                src={
                  "http://localhost:1337" +
                  item.attributes.picture.data.attributes.url
                }
                alt="item"
                width={50}
              />
            </div>
            <div className="body-col">
              <Card.Body>
                <Card.Title>{item.attributes.title}</Card.Title>
                <Card.Text>{item.attributes.description}</Card.Text>
              </Card.Body>
              <Col className="add-icon position-absolute top-0 end-0 p-2">
                <img
                  src="../plus.png"
                  style={{ width: "20px", height: "20px" }}
                  alt="Add Icon"
                />
              </Col>
              <Col className="heart-icon position-absolute bottom-0 end-0 p-2">
                <img
                  src="../heart.png"
                  style={{ width: "20px", height: "20px" }}
                  alt="Like Icon"
                />
              </Col>
              <Link to={{ pathname: `/courses/${item.id}` }}>
                <Button variant="dark">Detail</Button>
              </Link>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Toprank;
