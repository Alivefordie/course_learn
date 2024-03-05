import { Navbar, Nav } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import UnloginNavbar from "./UnloginNavbar";
import InsNavbar from "./Ins/InsNavbar";
import NavSuperAdmin from "./superadmin/NavSuperAdmin";

const NavbarTop = ({ NavbarLink }) => {
	const context = useContext(AuthContext);
	useEffect(() => {
		//console.log(context.state);
		//console.log(context.state.role);
	});
	return (
		<div>
			<Navbar bg="white" className="NavbarTop">
				<Navbar.Brand style={{ marginLeft: "10px" }}>
					<Nav.Link href="/">
						<img src="/course_learn.png" width="125" height="60" />
					</Nav.Link>
				</Navbar.Brand>
				{context.state.isLoggedIn ? (
					context.state.role == "student" ? (
						NavbarLink && <NavbarLink />
					) : context.state.role == "Instructors" ? (
						<InsNavbar />
					) : (
						<NavSuperAdmin />
					)
				) : (
					<UnloginNavbar />
				)}
			</Navbar>
		</div>
	);
};

export default NavbarTop;
