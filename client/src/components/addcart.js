import { useContext, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import { AuthContext } from "../context/AuthContext";

function AddCart({ course }) {
    const context = useContext(AuthContext);
    const login = context.state.isLoggedIn;
    const courseContent = course.attributes;
    const [cart, setcart] = useState(courseContent.entries?.data[0]?.attributes?.cart);
    const enroll = courseContent.entries?.data[0]?.attributes?.enroll;

    const addToCart = async () => {
        if (login) {
            const response = await ax.get(conf.apiUrlPrefix + `/courses/${course.id}/toCart`);
            setcart(response.data.AddToCart);
        } else {
        }
    };

    return (
        <div>
            {enroll ? (
                <img
                    onClick={addToCart}
                    style={{ cursor: "pointer", width: "100%", width: "20px", height: "20px" }}
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
        </div>
    );
}

export default AddCart;