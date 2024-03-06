import { Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const NavSuperAdmin = () => {
	const context = useContext(AuthContext);
	return (
		<Nav className="NavbarLink" style={{ marginLeft: "auto", marginRight: "10px" }}>
			<Nav.Link href="/superadmin" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="/web.png" style={{ marginLeft: "5px", width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>Maintain</div>
			</Nav.Link>
			<Nav.Link
				onClick={context.logout}
				href="/"
				style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="/box-arrow-right.svg" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>Log out</div>
			</Nav.Link>
			<Nav.Link href="/" style={{ flexDirection: "column", textAlign: "center" }}>
				<img src="/chevron-left.png" style={{ width: "40px", height: "40px" }} />
				<div style={{ fontSize: "10px" }}>Back</div>
			</Nav.Link>
		</Nav>
	);
};

export default NavSuperAdmin;
