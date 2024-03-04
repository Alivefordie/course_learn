import React, { useState } from "react";

import { Container, Col } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import "../App.css";
import style from "../css/Error.module.css";
const Error = () => {
	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			<Container sm="1" md="4">
				<Col className="error-col">
					<h1 className="header-inpro text-center ">Error</h1>
					<h1 className={`${style.cssload} seose header-inpro text-center mx-auto`}>404</h1>
					<h1 className="NotFond header-inpro text-center mx-auto">Page Not Found</h1>
				</Col>
			</Container>
		</div>
	);
};

export default Error;
