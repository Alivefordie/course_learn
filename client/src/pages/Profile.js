import React, { useEffect, useState } from "react";
import Datapro from "../components/Datapro";
import conf from "../conf/main";
import ax from "../conf/ax";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";


const Profile = () => {
    const [data, setData] = useState({});
    const [entries, setEntries] = useState([]);
    const [course, setCourse] = useState([]);
    const [picture,setpicture] = useState("")


    const fetchProfile = async () => {
        try {
            const response = await ax.get(conf.test);
            setData(response.data);
            setEntries(response.data.entries);
            const courses = response.data.entries.map((item) => item.course);
            setCourse(courses);
        } catch (error) {
            console.log("fetchProfile error:", error);
        }
    };

    const fetchProfilePicture = async () => {
        try {
            const response = await ax.get("http://localhost:1337/api/users/me?populate[picture]=*");
            const pictureUrl = response.data.picture.map((item) => item.url)
            setpicture(pictureUrl)
            // console.log(pictureUrl)
            

        } catch (error) {
            console.log("fetchProfilePicture error:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchProfilePicture();
    }, []);

    return (
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            <Datapro data={[data, entries, course,picture]} />
        </div>
    );
};

export default Profile;
