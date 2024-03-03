import { Nav } from "react-bootstrap";
import styles from "../css/Navbar.module.css";

const UnloginNavbar = () => {
	return (
		<Nav className="NavbarLink" style={{ marginLeft: "auto", marginRight: "10px" }}>
			<Nav.Link href="/login" className={styles.text}>
				<img src="../door-open.svg" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>Login</div>
			</Nav.Link>
			<Nav.Link href="/" className={styles.text}>
				<img src="../chevron-left.png" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>Back</div>
			</Nav.Link>
		</Nav>
	);
};

export default UnloginNavbar;
