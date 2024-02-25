import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";
import Specific from "../../components/Specific";
import NavbarTop from "../../components/NavbarTop";
import NavbarLink from "../../components/NavbarLink";

const Pag2 = () => {
    const [courses1, setCourses1] = useState([]);
    const { item } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/courses/${item}`);
                const coursesData = response.data.data;
                setCourses1(coursesData);
                // console.log(coursesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [item]);

    return (
        <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
            <Specific data = {courses1} />
        </div>
    );
}

export default Pag2;
