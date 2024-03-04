import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NavbarTop from "../NavbarTop";
import { Link, useParams } from "react-router-dom";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import axios from "axios";

const CourseV = () => {
    const { item } = useParams();
    const [course, setCourse] = useState({});
    const [syllabus, setSyllabus] = useState([]);
    const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [Id, setId] = useState();
    const [value,setvalue] = useState()

    const fetchSyllabus = async () => {
        const response = await ax.get(`http://localhost:1337/api/courses/${item}`);
        setCourse(response.data.data);
        setSyllabus(response.data.data.attributes.course_syllabus);
    };

    useEffect(() => {
        fetchSyllabus();
    }, []);

    const test1 = async () => {
        try {
            const response1 = await ax.get("http://localhost:1337/api/progresses");
            console.log("data vulue progress:", response1.data.data);
            console.log("data value progress:", response1.data.data.map((item) => item.attributes.value));
            setvalue(response1.data.data.map((item) => item.attributes.value));
            console.log("data progress len:", response1.data.data[0].id);
            setId(response1.data.data[0].id);
            // setLen(response1.data.data.length);
            const progressData = {
                data: {
                    value: progress,
                    users_permissions_user: 21
                }
            };
            if (response1.data.data.length === 0) {
                console.log("post");
                const test1 = await ax.post(`${conf.apiUrlPrefix}/progresses`, progressData);
                console.log(test1);
            } else {
                const fixprogressData = {
                    data : {value: progress}
                };
                if(response1.data.data.map((item) => item.attributes.value) <= progress){
                console.log("put");
                const test = await ax.put(`${conf.apiUrlPrefix}/progresses/${Id}`, fixprogressData);
                }
                // console.log(test);
            }
            // Call test function to handle progress data
            // test();
        } catch (error) {
            console.log("Error fetching progress:", error);
            // setLen(0);
        }
    };

    useEffect(() => {
        test1();
    }, [progress]);

    const handlesyllabusChange = (index) => {
        setCurrentSyllabusIndex(index);
        setProgress(0);
    };

    const getUrlVideo = (videoComponent) => {
        return videoComponent.videoFile.data[0].attributes.url;
    };
    const getUrlFile = (FileComponent) => {
        return FileComponent.material.data[0].attributes.url;
    };

    const componentStyle = (syllabus) => {
        switch (syllabus.__component) {
            case "activity.video":
                return (
                    <div className="col-md-8">
                        <p>Title: {syllabus.title}</p>
                        <p>Description: {syllabus.description}</p>
                        <ReactPlayer
                            url={conf.url + getUrlVideo(syllabus)}
                            controls
                            playing={true}
                            onProgress={({ playedSeconds }) => {
                                setProgress(Math.round(playedSeconds));
                            }}
                        />
                        <p>Progress: {progress}</p>
                    </div>
                );
            case "activity.text":
                return (
                    <div className="col-md-8">
                        <p>Title: {syllabus.title}</p>
                        <p>Description: {syllabus.description}</p>
                    </div>
                );

            case "activity.file":
                return (
                    <div className="col-md-8">
                        <p>Title: {syllabus.title}</p>
                        <p>
                            Download:{" "}
                            <Link to={conf.url + getUrlFile(syllabus)} target="_blank">
                                File
                            </Link>
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="body">
            <NavbarTop />
            <div className="container">
                {syllabus.length > 0 && (
                    <div className="row">
                        {componentStyle(syllabus[currentSyllabusIndex])}
                        <div className="col-md-4">
                            <div className="list-group">
                                {syllabus.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`list-group-item list-group-item-action ${
                                            index === currentSyllabusIndex ? "active" : ""
                                        }`}
                                        onClick={() => handlesyllabusChange(index)}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseV;
