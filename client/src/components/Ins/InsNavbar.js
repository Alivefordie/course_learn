import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const InsNavbar = ({ NavbarLink }) => {
	return (
		<div>
			<Navbar bg="white" className="NavbarTop">
				<Navbar.Brand style={{ marginLeft: "10px" }}>
					<Link to="/">
						<img src="../course_learn.png" width="125" height="60" />
					</Link>
				</Navbar.Brand>
				<Nav className="NavbarLink" style={{ marginLeft: "auto", marginRight: "10px" }}>
					<Nav.Link
						href="/Instructors/create"
						style={{ flexDirection: "column", textAlign: "center" }}>
						<img src="../plus.png" style={{ width: "40px", height: "40px" }} />
						<div style={{ fontSize: "10px" }}>New</div>
					</Nav.Link>
					<Nav.Link href="/Instructors" style={{ flexDirection: "column", textAlign: "center" }}>
						<img src="../course.png" style={{ width: "40px", height: "40px" }} />
						<div style={{ fontSize: "10px" }}>myCourses</div>
					</Nav.Link>
					<Nav.Link href="/Instructors" style={{ flexDirection: "column", textAlign: "center" }}>
						<img src="../chevron-left.png" style={{ width: "40px", height: "40px" }} />
						<div style={{ fontSize: "10px" }}>Back</div>
					</Nav.Link>
				</Nav>
			</Navbar>
		</div>
	);
};

export default InsNavbar;
