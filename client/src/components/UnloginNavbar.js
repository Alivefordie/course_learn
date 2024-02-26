import { Nav } from "react-bootstrap";

const UnloginNavbar = () => {
	return (
		<Nav className="NavbarLink" style={{ marginLeft: "auto", marginRight: "10px" }}>
			<Nav.Link href="/login" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../door-open.svg" style={{ width: "40px", height: "45px" }} />
				<div style={{ fontSize: "10px" }}>Login</div>
			</Nav.Link>
			<Nav.Link href="/" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="../chevron-left.png" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>Back</div>
			</Nav.Link>
		</Nav>
	);
};

export default UnloginNavbar;
