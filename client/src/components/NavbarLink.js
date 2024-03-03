import { Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../css/Navbar.module.css";
import conf from "../conf/main";

const NavbarLink = () => {
	const context = useContext(AuthContext);
	const profilePicture = context.state.picture
		? `${conf.url}${context.state.picture}`
		: "../Profiledf.jpg";
	return (
		<Nav className="NavbarLink" style={{ marginLeft: "auto", marginRight: "10px" }}>
			<Nav.Link href="/mycourses" className={styles.text}>
				<img src="../course.png" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>myCourses</div>
			</Nav.Link>
			<Nav.Link href="/history" className={styles.text}>
				<img src="../history.png" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>History</div>
			</Nav.Link>
			<Nav.Link href="/cart" className={styles.text}>
				<img src="../cart.png" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>myCart</div>
			</Nav.Link>
			<Nav.Link onClick={context.logout} href="/" className={styles.text}>
				<img src="../box-arrow-right.svg" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>Log out</div>
			</Nav.Link>
			<Nav.Link href="/" className={styles.text}>
				<img src="../chevron-left.png" className={styles.picture} />
				<div style={{ fontSize: "10px" }}>Back</div>
			</Nav.Link>
			<Nav.Link href="/profile" className={styles.text}>
				<img src={profilePicture} className={styles.profile} />
				<div style={{ fontSize: "10px" }}>profile</div>
			</Nav.Link>
		</Nav>
	);
};

export default NavbarLink;
