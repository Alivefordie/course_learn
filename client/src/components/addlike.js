import { useContext, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import { AuthContext } from "../context/AuthContext";

function AddLike({ course }) {
    const context = useContext(AuthContext);
    const login = context.state.isLoggedIn;
    const courseContent = course.attributes;
    const [like, setLike] = useState(courseContent.entries?.data[0]?.attributes?.like);
    const multipleEntries = courseContent.entries?.data.length > 1;

    const addTolike = async () => {
        if (login && !multipleEntries) {
            console.log('like',courseContent.entries?.data[0]?.attributes?.like)
            console.log('multipleentry',courseContent.entries?.data.length > 1)
            const response = await ax.get(conf.apiUrlPrefix + `/courses/${course.id}/like`);
            setLike(response.data.like);
        } else {
            
        }
    };

    useEffect(() => {
		console.log('course',course)
        console.log('like',courseContent.entries?.data[0]?.attributes?.like)
		// console.log(login);
		// console.log(like);
		// console.log(courseContent);
	}, []);

    return (
        <>
            {!like ? (
                <img
                    onClick={addTolike}
                    style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
                    src="../heart.png"
                    alt="Like Icon"
                />
            ) : (
                <img
                    onClick={addTolike}
                    style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
                    src="../red-heart-icon.svg"
                    alt="Like Icon"
                />
            )}</>
    );
}

export default AddLike;