import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import NavbarLink from "../NavbarLink";
import NavbarTop from "../NavbarTop";
import ax from "../../conf/ax";

const CourseV = () => {
    const [videos, setVideos] = useState([]);
    const [data, setData] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [values, setvalues] = useState()

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

    const updateLearningProgress = async () => {
        try {
            const jwtToken = sessionStorage.getItem('auth.jwt');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            const response = await axios("http://localhost:1337/api/progresses?populate=*")
            console.log(response.data.data)
            setvalues(response.data.data)
            const test = response.data.data


            const progressData = {
                course_video: 20,
                values: 0,
                users: 1
            }

            const fixprogressData = {
                values: 20,
            }


            if (!test) {
                const test1 = await axios.post("http://localhost:1337/api/progresses", progressData)
                console.log(test1)
            }
            else {
                const test2 = await axios.put("http://localhost:1337/api/progresses", fixprogressData)
                console.log(test2)
            }
        }
        catch (error) {
            console.log("fail to progress", error)
        }
    }
    useEffect(() => {
        updateLearningProgress()
    }, [])



    // useEffect(() => {
    //     if (
    //         (progress % 2 === 0 || Math.round((progress / C[currentVideoIndex].attributes.length) * 100) > 80) &&
    //         progress !== 100
    //     ) {
    //         updateLearningProgress();
    //     }
    // }, [progress]);

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
