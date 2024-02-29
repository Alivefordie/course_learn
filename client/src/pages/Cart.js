//จัดเลอร์เยอะโอเค เหลือเพิ่มเข้าไป
import React, { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import ax from "../conf/ax";
import conf from "../conf/main";
import Spinner from "../components/Spinner";

const Cart = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [filter, setFilter] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchData = async () => {
		try {
			// const jwtToken = sessionStorage.getItem('auth.jwt');
			// if (!jwtToken) {
			//   console.error('JWT token not found.');
			//   return;
			// }
			// axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
			// const response = await axios.get("http://localhost:1337/api/users/me?populate[entries][populate][course]=*");
			const response = await ax.get(conf.findanything);
			const filteredData = response.data.entries.filter((entry) => entry.cart !== null);
			setFilter(filteredData);
			setData(filteredData.map((entry) => entry.course));
			calculateTotalPrice(filteredData.map((entry) => entry.course));
			setLoading(false);
		} catch (error) {
			console.error("Error occurred:", error);
			setLoading(false);
		}
	};

	const payment = () => {
		navigate("/payment");
	};

	const calculateTotalPrice = (courses) => {
		const totalPrice = courses.reduce((acc, course) => {
			if (course.price) {
				return acc + course.price;
			}
			return acc;
		}, 0);
		setTotalPrice(totalPrice);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			{loading ? (
				<Spinner />
			) : (
				<Container className="cart-container">
					<Container className="incart-container">
						<h1 className="text-center mb-4">My Cart</h1>
						<Row className="g-4">
							<Col md={6}>
								{filter.map((item) => (
									<div
										key={item.id}
										className="card border border-dark mb-3"
										style={{
											backgroundImage: `url(${item.course.image})`,
											backgroundSize: "cover",
											backgroundPosition: "left",
											width: "100%",
										}}>
										<div className="card-body">
											<h5 className="card-title">{item.course.title}</h5>
											<p className="card-text">Price: {item.course.price}</p>
										</div>
									</div>
								))}
							</Col>
							<Col md={6}>
								<div className="d-flex flex-column justify-content-center align-items-center">
									<Button variant="outline-dark" onClick={payment} className="pay-button mb-3">
										Proceed to Payment
									</Button>
									<div className="total-price">
										<p className="mb-0">Total Price: {totalPrice}</p>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
					<div></div>
				</Container>
			)}
		</div>
	);
};

export default Cart;
