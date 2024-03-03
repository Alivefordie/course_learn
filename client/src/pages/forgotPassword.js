import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import Spinner from "../components/Spinner";
import ax from "../conf/ax";
import conf from "../conf/main";
import NavbarTop from "../components/NavbarTop";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(true);
	const [validated, setValidated] = useState(false);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const sendEmail = async () => {
		setLoading(true);
		const response = await ax.post(`${conf.apiUrlPrefix}/auth/forgot-password`, {
			email: email,
		});
		alert("send");
	};

	const handelSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			sendEmail();
		}

		setValidated(true);
	};
	useEffect(() => {
		setTimeout(() => setLoading(false), 1500);
	}, []);

	return (
		<div className="body">
			<NavbarTop />
			{loading ? (
				<Spinner />
			) : (
				<Container>
					<Col className="formnewpass">
						<Form
							className="m-5"
							name="email"
							noValidate
							validated={validated}
							onSubmit={handelSubmit}>
							<Form.Group className=" mb-4">
								<Form.Label className=" mb-4">Your Email address</Form.Label>
								<Form.Control
									value={email}
									onChange={handleEmailChange}
									type="email"
									required
									placeholder="Enter email"
								/>
							</Form.Group>
							<Button className=" d-flex mx-auto" variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Container>
			)}
		</div>
	);
}

export default ForgotPassword;
