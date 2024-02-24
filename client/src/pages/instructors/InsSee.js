import React, { useEffect, useState } from "react";
import axios from "axios";
import TopIns from "../../components/Ins/TopIns";
import NavbarTop from "../../components/NavbarTop";
import NavbarLink from "../../components/NavbarLink";

const InsSee = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedJwtToken = sessionStorage.getItem('jwtToken');
        const storedRolename = sessionStorage.getItem("Rolename");
        if (storedJwtToken && storedRolename === "Instructors") {
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedJwtToken}`;
          const response = await axios.get("http://localhost:1337/api/users/me?populate[courses]=*");
          setMyData(response.data.courses);
        } else {
          console.log('JWT token not found.');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <NavbarTop NavbarLink={NavbarLink} />
     <TopIns data={myData} />
    </div>
  );
};

export default InsSee;
