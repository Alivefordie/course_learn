import React, { useEffect, useState } from "react";
import Datapro from "../components/Datapro";
// import axios from "axios";
import conf from "../conf/main";
import ax from "../conf/ax";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";

const Profile = () => {
    const [data, setdata] = useState({});
    const [entries, setentries] = useState([]);
    const [course, setcourse] = useState([]);

    const fetchProfile = async () => {
        try {
            const response = await ax.get(conf.test);
            setdata(response.data);
            // console.log("response data: ", response.data);

            setentries(response.data.entries);
            // console.log("response entries: ", response.data.entries);

            
            const courses = response.data.entries.map((item) => item.course);
            setcourse(courses);
            // console.log("response course: ", courses);
        }
        catch (error) {
            console.log("fail");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            <Datapro data={[data, entries, course]} />
        </div>
    );
};

export default Profile;
