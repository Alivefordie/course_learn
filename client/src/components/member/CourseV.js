import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NavbarTop from "../NavbarTop";
import { Link, useParams } from "react-router-dom";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import axios from "axios";
import { Button } from "react-bootstrap";

const CourseV = () => {
    const { item } = useParams();
    const [course, setCourse] = useState({});
    const [syllabus, setSyllabus] = useState([]);
    const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [video, setvideo] = useState(false)

    const fetchSyllabus = async () => {
        const response = await ax.get(`http://localhost:1337/api/courses/${item}`);
        setCourse(response.data.data);
        setSyllabus(response.data.data.attributes.course_syllabus);
        const syllabusData = response.data.data.attributes.course_syllabus;
        console.log(syllabusData)
        // console.log(response.data.data.attributes.course_syllabus.map((item) => item.id))
        // const videos = syllabusData.filter(item => item.__component === 'activity.video').map(item => ({ id: item.id, url: item.videoFile.data[0].attributes.url }));
        // setvideo(syllabusData.filter(item => item.__component === 'activity.video').map(item => ({ id: item.id, url: item.videoFile.data[0].attributes.url })));
        // console.log(videos);
        console.log(syllabusData)
        if(syllabusData[0].__component == "activity.video"){
            console.log("Yes")
            setvideo(true)
        }
        else{
            setvideo(false)
        }
        // const videoIds = syllabus.filter(item => item.__component === 'activity.video').map(item => item.id);
        // setvideo(videoIds);
        // console.log(videoIds);

    };

    // useEffect(() => {
        //     console.log(video)
        // })
        
        const test1 = async () => {
            try {
                console.log(syllabus[currentSyllabusIndex])
                const progressData = {
                    data: {
                        id: syllabus[currentSyllabusIndex].id,
                        value: progress
                    }
                };
                console.log(progressData)
                const response2 = await ax.put(`http://localhost:1337/api/progresses/${item}`, progressData);
                console.log(response2);
            } catch (error) {
                console.log("Error fetching progress:", error);
            }
        };

    useEffect(() => {
        fetchSyllabus();
    }, []);

    useEffect(() => {

        if (progress == 5) {
            // test1();
        }
    }, [progress]);

    const handlesyllabusChange = (index) => {
        if(syllabus[index].__component === "activity.video"){
            setvideo(true)
        }
        else{
            setvideo(false)
        }
        setCurrentSyllabusIndex(index);
        setProgress(0);
    };

    const getUrlVideo = (videoComponent) => {
        // console.log(videoComponent)
        return videoComponent.videoFile.data[0].attributes.url;
    };
    const getUrlFile = (FileComponent) => {
        // console.log(FileComponent)
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
                                        className={`list-group-item list-group-item-action ${index === currentSyllabusIndex ? "active" : ""
                                            }`}
                                        onClick={() => handlesyllabusChange(index)}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                                {video && <Button variant="daak" onClick={test1}>Click</Button>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseV;
