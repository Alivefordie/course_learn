import React from "react";
import { useContext, useEffect, useState } from "react";
import { Modal, Row, Col, Container } from "react-bootstrap";
import styles from "../css/Popup.module.css";

function LoginFirst({ showLoginFirstModal, closeModal, message }) {
	const handleClose = () => {
		closeModal();
	};

	return (
		<Modal centered show={showLoginFirstModal} onHide={handleClose}>
			<Modal.Header closeButton />
			<Modal.Body className={styles.modalBody}>
				<Container className={styles.centeredContent}>
					<div className={styles.exclamation} />
					<span className={styles.loginText}>{message ? message : ""}</span>
				</Container>
			</Modal.Body>
		</Modal>
	);
}

export default LoginFirst;
