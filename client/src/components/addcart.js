import { useContext, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import { AuthContext } from "../context/AuthContext";
import LoginFirst from "./PleaseLogin";

function AddCart({ course, onResponse }) {
    const context = useContext(AuthContext);
    const login = context.state.isLoggedIn;
    const courseContent = course.attributes ? course.attributes : null;
    const [cart, setcart] = useState(courseContent ? courseContent.entries?.data[0]?.attributes?.cart : course.cart);
    const enroll = courseContent ? courseContent.entries?.data[0]?.attributes?.enroll : course.enroll;
    const [showLoginFirst, setShowLoginFirst] = useState(false);
    const [message, setmessage] = useState('');

    const addToCart = async () => {
        if (login) {
            if (context.state.role === 'student') {
                const response = await ax.get(conf.apiUrlPrefix + `/courses/${courseContent ? course.id : course.course.id}/toCart`);
                setcart(response.data.AddToCart);
                if (onResponse) {
                    onResponse(response);
                }
                else {
                    window.location.reload();
                }
            } else {
                setmessage("You can't add to cart")
                setShowLoginFirst(true);
            }
        } else {
            setmessage("Please Login First")
            setShowLoginFirst(true);
        }
    };

    const handleClose = () => {
        setShowLoginFirst(false);
    };

    useEffect(() => {
        // console.log('course', course)
       
        // console.log(like);
        // console.log(courseContent);
    }, []);

    return (
        <>
            {showLoginFirst && <LoginFirst showLoginFirstModal={showLoginFirst} closeModal={handleClose} message={message}/>}
            {enroll ? (
                <img
                    style={{ width: "100%", width: "20px", height: "20px" }}
                    src="../check-all.svg"
                    alt="Add Icon"
                />
            ) : cart ? (
                <img
                    onClick={addToCart}
                    style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
                    src="../cart-check.svg"
                    alt="Add Icon"
                />
            ) : (
                <img
                    onClick={addToCart}
                    style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
                    src="../plus.png"
                    alt="Add Icon"
                />
            )}
        </>
    );
}

export default AddCart;
