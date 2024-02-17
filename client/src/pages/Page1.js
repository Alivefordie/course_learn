import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Toprank from "../components/Toprank";
import Common from "../components/Common";
const Pag1 = () => {
  // const navigate = useNavigate();
  const [courses1, setCourses1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/courses');
        const coursesData = response.data.data; 
        setCourses1(coursesData); 
        // console.log(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h5>Pag1</h5>
      <h3>Top 3 ranks</h3>
      <Toprank data={courses1} />
      <h3>common</h3>
      <Common data={courses1} />

    </div>
  );
};

export default Pag1;
