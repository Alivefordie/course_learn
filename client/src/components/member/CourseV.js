import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import NavbarTop from "../NavbarTop";
import { useParams } from "react-router-dom";

const CourseV = () => {
    const { item } = useParams();
    const [videos, setVideos] = useState([]);
    const [course, setCourse] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const jwtToken = sessionStorage.getItem('auth.jwt');
                if (!jwtToken) {
                    console.error('JWT token not found.');
                    return;
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
                
                const response = await axios.get(`http://localhost:1337/api/courses/${item}?populate=*`);
                const courseData = response.data.data;
                setCourse(courseData);
                const syllabusVideos = courseData.attributes.course_syllabus.map(item => item);
                setVideos(syllabusVideos);
            } catch (error) {
                console.error("Failed to fetch course:", error.message);
            }
        };

        fetchCourse();
    }, [item]);


    return (
        <div>
            {videos.map((val, index) => {
                if (val.__component === "activity.video") {
                    return (
                        <div key={index}>
                            <h6>Video</h6>
                            <p>Title: {val.title}</p>
                            <p>Link: {val.videoFile.url}</p>
                            <ReactPlayer url={val.videoFile.url} controls />
                            <hr style={{ borderTop: "1px solid black" }} />
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default CourseV;
