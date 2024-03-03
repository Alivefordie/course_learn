import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import Spinner from "../components/Spinner";
import ax from "../conf/ax";
import conf from "../conf/main";
import NavbarTop from "../components/NavbarTop";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";

function NewPassword() {
	const [password, setpassword] = useState("");
	const [loading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [strength, setStrength] = useState({
		hasLow: false,
		hasCap: false,
		hasNumber: false,
		has8digit: false,
	});

	const handlepasswordChange = (event) => {
		setpassword(event.target.value);
	};

	const sendpassword = async () => {
		setLoading(true);
		const response = await ax.post(`${conf.apiUrlPrefix}/auth/reset-password`, {
			code: searchParams.get("code"),
			password: password,
			passwordConfirmation: password,
		});
		alert("reset");
		console.log(response);
	};

	const handelSubmit = (event) => {
		if (!strength.has8digit) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			sendpassword();
		}
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
						<Form className="m-5" name="password" noValidate onSubmit={handelSubmit}>
							<Form.Group>
								<Form.Label className=" mb-4">New Password</Form.Label>
								<Form.Control
									value={password}
									onChange={handlepasswordChange}
									type="password"
									required
									placeholder="e.g. Abcd1234"
									isInvalid={!strength.has8digit & (password.length > 0)}
									isValid={strength.has8digit}
								/>
								<PasswordStrength
									password={password}
									Strength={strength}
									setStrength={setStrength}
								/>
							</Form.Group>
							<Button variant="primary" className=" d-flex mx-auto" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Container>
			)}
		</div>
	);
}

export default NewPassword;
