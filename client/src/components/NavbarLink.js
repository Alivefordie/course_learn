import { Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const NavbarLink = () => {
	const context = useContext(AuthContext);
	return (
		<Nav className="NavbarLink" style={{ marginLeft: "auto", marginRight: "10px" }}>
			<Nav.Link href="/mycourses" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../course.png" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>myCourses</div>
			</Nav.Link>
			<Nav.Link href="/history" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../history.png" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>History</div>
			</Nav.Link>
			<Nav.Link href="/cart" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../cart.png" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>myCart</div>
			</Nav.Link>
			<Nav.Link
				onClick={context.logout}
				href="/"
				style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../box-arrow-right.svg" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>Log out</div>
			</Nav.Link>
			<Nav.Link href="/" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../chevron-left.png" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>Back</div>
			</Nav.Link>
		</Nav>
	);
};

export default NavbarLink;
