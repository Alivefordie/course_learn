import React, { useEffect, useState } from "react";
import axios from 'axios';
import Toprank from "../../components/Toprank";
import Common from "../../components/Common";
import NavbarTop from "../../components/NavbarTop";
import NavbarLink from "../../components/NavbarLink";

const Pag1 = () => {
  const [courses, setCourses] = useState([]);
  const storedJwtToken = sessionStorage.getItem("jwtToken");
  const storedRolename = sessionStorage.getItem("Rolename");

  // Set default headers
  useEffect(() => {
    if (storedJwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedJwtToken}`;
    }
  }, [storedJwtToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedJwtToken && storedRolename === "Instructors") {
          const response = await axios.get('http://localhost:1337/api/courses?populate=*');
          const coursesData = response.data.data; 
          setCourses(coursesData); 
        } else {
          console.log("User is not authorized to view this data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storedJwtToken, storedRolename]);

  return (
    <div>
      <NavbarTop NavbarLink={NavbarLink}/>
      <h5>Pag1</h5>
      <h3>Top 3 ranks</h3>
      <Toprank data={courses} />
      <h3>Common</h3>
      <Common data={courses} />
    </div>
  );
};

export default Pag1;
