import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import NavbarLink from "../NavbarLink";
import NavbarTop from "../NavbarTop";

const CourseV = () => {
    const [videos, setVideos] = useState([]);
    const [data, setData] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
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

    const handleVideoChange = index => {
        setCurrentVideoIndex(index);
        setProgress(0);
    };

    return (
        <div className="container">
            <NavbarTop NavbarLink={NavbarLink} />
            {videos.length > 0 && (
                <div className="row">
                    <div className="col-md-8">
                        <p>Title: {data[currentVideoIndex].attributes.title}</p>
                        <p>Description: {data[currentVideoIndex].attributes.description}</p>
                        <ReactPlayer
                            url={"http://localhost:1337" + videos[currentVideoIndex]}
                            controls
                            playing={true}
                            onProgress={({ playedSeconds }) => {
                                console.log(Math.round(playedSeconds));
                                setProgress(Math.round(playedSeconds));
                            }}
                        />
                        <p>Progress: {progress}</p>
                    </div>
                    <div className="col-md-4">
                        <div className="list-group">
                            {data.map((item, index) => (
                                <button
                                    key={index}
                                    className={`list-group-item list-group-item-action ${index === currentVideoIndex ? "active" : ""}`}
                                    onClick={() => handleVideoChange(index)}
                                >
                                    {item.attributes.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseV;
