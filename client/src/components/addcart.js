import { useContext, useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import { AuthContext } from "../context/AuthContext";

function AddCart({ course, onResponse }) {
    const context = useContext(AuthContext);
    const login = context.state.isLoggedIn;
    const courseContent = course.attributes?course.attributes:null;
    const [cart, setcart] = useState(courseContent?courseContent.entries?.data[0]?.attributes?.cart:course.cart);
    const enroll = courseContent?courseContent.entries?.data[0]?.attributes?.enroll:course.enroll;

    const addToCart = async () => {
        if (login) {
            const response = await ax.get(conf.apiUrlPrefix + `/courses/${courseContent?course.id:course.course.id}/toCart`);
            setcart(response.data.AddToCart);
            if (onResponse) {
                onResponse(response);
            } else {
            window.location.reload();}
        } 
    };

	return (
		<>
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
