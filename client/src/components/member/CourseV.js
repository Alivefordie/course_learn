import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import NavbarLink from "../NavbarLink";
import NavbarTop from "../NavbarTop";

const CourseV = () => {
    const [videos, setVideos] = useState([]);
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(0);

    const fetchVideos = async () => {
        try {
            const jwtToken = sessionStorage.getItem('auth.jwt');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            const response = await axios.get("http://localhost:1337/api/course-videos?populate=*");
            setData(response.data.data);
            setVideos(response.data.data.map(item => item.attributes.video.data.attributes.url));
        } catch (error) {
            console.error("Failed to fetch videos:", error.message);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            {videos.length > 0 && data.map((item, index) => (
                <div key={index}>
                    <p>Title: {item.attributes.title}</p>
                    <p>Description: {item.attributes.description}</p>
                    <ReactPlayer
                        url={"http://localhost:1337" + videos[index]}
                        controls
                        onProgress={({ playedSeconds }) => {
                            console.log(Math.round(playedSeconds));
                            setProgress(Math.round(playedSeconds));
                        }}
                    />
                    <p>Progress: {progress}</p>
                </div>
            ))}
        </div>
    );
};

export default CourseV;
