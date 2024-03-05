import React, { useEffect, useState } from "react";
import Toprank from "../components/Toprank";
import Common from "../components/Common";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import "../App.css";
import Newest from "../components/Newest";
import Spinner from "../components/Spinner";
import ax from "../conf/ax";
import conf from "../conf/main";

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newestCourses, setNewestCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCourse, setSearchCourse] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchLikeMost();
      await fetchNewest();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchNewest = async () => {
    try {
      const response = await ax.get(`${conf.apiUrlPrefix}/courses?Newest=true`);
      const coursesData = response.data.data;
      setNewestCourses(coursesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchLikeMost = async () => {
    try {
      const response = await ax.get(
        `${conf.apiUrlPrefix}/courses?likeMost=true`
      );
      const coursesData = response.data.data;
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchCourse = (e) => {
    setSearchCourse(e.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.attributes.title.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div>
      <NavbarTop NavbarLink={NavbarLink} />
      <div className="search-bar">
        <InputGroup className="search-bar-input" style={{ width: "35%" }}>
          <FormControl
            placeholder="Search course..."
            value={searchCourse}
            onChange={handleSearchCourse}
          />
        </InputGroup>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="page1-container" sm="3" md="4">
          <Row className="page1-rows">
            <Col
              id="top-rank-course"
              className="top-rank-course col-shadow"
              data-bs-spy="scroll"
              data-bs-target="#top-rank-course"
              data-bs-offset="0"
            >
              <h3 className="header-toprank">
                <img
                  src="../fire.png"
                  style={{ width: "30px", height: "30px" }}
                  alt="Fire Icon"
                  className="fire-image"
                />
                Top 3 ranks
              </h3>

              <div
                className="item-top scrollbar"
                style={{ maxHeight: "500px", lineWidth: "51px" }}
              >
                <Toprank data={courses} />
              </div>
            </Col>

            <Col
              id="common-col"
              className="common-col col-shadow"
              data-bs-spy="scroll"
              data-bs-target="#common-col"
              data-bs-offset="0"
            >
              <h3 className="header-common">
                <img
                  src="../book.png"
                  style={{ width: "30px", height: "30px" }}
                  alt="Common Icon"
                  className="common-image"
                />
                {searchCourse ? "Search" : "Common"}
              </h3>

              <div
                className="item-common scrollbar"
                style={{ maxHeight: "500px" }}
              >
                <Common data={filteredCourses} />
              </div>
            </Col>

            {!searchCourse && (
              <Col
                id="newest-col"
                className="newest-col col-shadow"
                data-bs-spy="scroll"
                data-bs-target="#newest-col"
                data-bs-offset="0"
              >
                <h3 className="header-newest">
                  <img
                    src="../newest.png"
                    style={{ width: "40px", height: "40px" }}
                    alt="Newest Icon"
                    className="newest-image"
                  />
                  Newest
                </h3>
                <div
                  className="item-newest scrollbar"
                  style={{ maxHeight: "500px" }}
                >
                  <Newest data={newestCourses} />
                </div>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default AllCourse;
