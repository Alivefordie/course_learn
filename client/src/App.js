import "./App.css";
import NavbarTop from "./components/NavbarTop";
import NavbarLink from "./components/NavbarLink";
import { BsBell } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AllCourse from "./pages/allCourse"

function App() {
  const [courses1, setCourses1] = useState([]);

  const Getdata = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/courses`);
      const coursesData = await response.json();
      setCourses1(coursesData);
      console.log(coursesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <AllCourse />
    </div>
  );
}

export default App;
