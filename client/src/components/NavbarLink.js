import { Button, Col, Container, Nav, Offcanvas, Row, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../css/Navbar.module.css";
import conf from "../conf/main";

const NavbarLink = () => {
	const context = useContext(AuthContext);
	const profilePicture = context.state.picture
		? `${conf.url}${context.state.picture}`
		: "../Profiledf.jpg";

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header className=" border-bottom border-danger " closeButton>
					<Offcanvas.Title style={{ fontSize: "40px" }}>myMenu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Container>
						<Nav.Link href="/mycourses" className={`menu-items d-flex ${styles.navLink}`}>
							<img
								className={styles.picture}
								src="/course.png"
								style={{ height: "50px", width: "50px" }}
							/>
							<h1 style={{ fontSize: "30px" }} className="menu-header">
								myCourses
							</h1>
						</Nav.Link>
						<Nav.Link href="/history" className={`menu-items d-flex ${styles.navLink}`}>
							<img
								src="/history.png"
								className={styles.picture}
								style={{ height: "50px", width: "50px" }}
							/>
							<h1 style={{ fontSize: "30px" }} className="menu-header">
								History
							</h1>
						</Nav.Link>
						<Nav.Link href="/cart" className={`menu-items d-flex ${styles.navLink}`}>
							<img
								src="/cart.png"
								className={styles.picture}
								style={{ height: "50px", width: "50px" }}
							/>
							<h1 style={{ fontSize: "30px" }} className="menu-header">
								myCart
							</h1>
						</Nav.Link>
						<Nav.Link
							onClick={context.logout}
							href="/"
							className={`menu-items d-flex ${styles.navLink}`}>
							<img src="/box-arrow-right.svg" className="logout-img my-auto" />
							<h1 style={{ fontSize: "30px" }} className="menu-header">
								Log out
							</h1>
						</Nav.Link>
						<Nav.Link href="/profile" className={`menu-items d-flex ${styles.navLink}`}>
							<img src={profilePicture} className="profile-img my-auto" />
							<h1 style={{ fontSize: "30px" }} className="menu-header">
								myProfile
							</h1>
						</Nav.Link>
					</Container>
				</Offcanvas.Body>
			</Offcanvas>
			<Nav className="NavbarLink d-sm-none" style={{ marginLeft: "auto", marginRight: "10px" }}>
				<Button onClick={handleShow} variant="outline-secondary">
					<img className={`${styles.picture}`} src="/justify.svg" />
				</Button>
			</Nav>
			<Nav
				className="NavbarLink d-none d-sm-flex"
				style={{ marginLeft: "auto", marginRight: "10px" }}>
				<Nav.Link href="/mycourses" className={styles.text}>
					<img src="/course.png" className={styles.picture} />
					<div style={{ fontSize: "10px" }}>myCourses</div>
				</Nav.Link>
				<Nav.Link href="/history" className={styles.text}>
					<img src="/history.png" className={styles.picture} />
					<div style={{ fontSize: "10px" }}>History</div>
				</Nav.Link>
				<Nav.Link href="/cart" className={styles.text}>
					<img src="/cart.png" className={styles.picture} />
					<div style={{ fontSize: "10px" }}>myCart</div>
				</Nav.Link>
				<Nav.Link onClick={context.logout} href="/" className={styles.text}>
					<img src="/box-arrow-right.svg" className={styles.picture} />
					<div style={{ fontSize: "10px" }}>Log out</div>
				</Nav.Link>
				<Nav.Link href="/" className={styles.text}>
					<img src="/chevron-left.png" className={styles.picture} />
					<div style={{ fontSize: "10px" }}>Back</div>
				</Nav.Link>
				<Nav.Link href="/profile" className={styles.text}>
					<img src={profilePicture} className={styles.profile} />
					<div style={{ fontSize: "10px" }}>myProfile</div>
				</Nav.Link>
			</Nav>
		</>
	);
};

export default NavbarLink;
