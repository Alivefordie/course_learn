import React from "react";
import { Modal } from "react-bootstrap";

function LoginFirst({ showLoginFirstModal, closeModal }) {
    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal show={showLoginFirstModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login First</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                Login First
            </Modal.Body>
        </Modal>
    );
}

export default LoginFirst;
