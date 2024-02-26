import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UnloginNavbar from "./UnloginNavbar";
import InsNavbar from "./Ins/InsNavbar";
const NavbarTop = ({ NavbarLink }) => {
	const context = useContext(AuthContext);
	const [role, setRole] = useState(sessionStorage.getItem("userRole"));
	useEffect(() => {
		//console.log(context.state);
		//console.log(role);
	});
	return (
		<div>
			<Navbar bg="white" className="NavbarTop">
				<Navbar.Brand style={{ marginLeft: "10px" }}>
					<Link to="/">
						<img src="../course_learn.png" width="125" height="60" />
					</Link>
				</Navbar.Brand>
				{context.state.isLoggedIn ? (
					role == "student" ? (
						NavbarLink && <NavbarLink />
					) : (
						<InsNavbar />
					)
				) : (
					<UnloginNavbar />
				)}
			</Navbar>
		</div>
	);
};

export default NavbarTop;
