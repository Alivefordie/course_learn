import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Spinner, Alert, Form } from "react-bootstrap";
import axios from "axios";
import InsNavbar from "../../components/Ins/InsNavbar";

const CreateCourse = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [editedItem, setEditedItem] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleEditClick = (item) => {
		setSelectedItem(item);
		setEditedItem({ ...item });
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEditedItem(null);
		setSelectedItem(null);
	};

	const handleSaveChanges = () => {
		console.log("Edited Item:", editedItem);
		handleCloseModal();
	};

	const handleChange = (e) => {
		setEditedItem({
			...editedItem,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="body">
			<InsNavbar />
			<div className="card-container">
				<Form>
					<Form.Group controlId="formTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							name="title"
							value={editedItem ? editedItem.title : ""}
							onChange={handleChange}
							placeholder="Enter title"
						/>
					</Form.Group>
					<Form.Group controlId="formDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="description"
							value={editedItem ? editedItem.description : ""}
							onChange={handleChange}
							placeholder="Enter description"
						/>
					</Form.Group>
					<Form.Group controlId="formPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="text"
							name="price"
							value={editedItem ? editedItem.price : ""}
							onChange={handleChange}
							placeholder="Enter price"
						/>
					</Form.Group>
					<Form.Group controlId="formMaxCapacity">
						<Form.Label>Max Capacity</Form.Label>
						<Form.Control
							type="text"
							name="maxCapacity"
							value={editedItem ? editedItem.maxCapacity : ""}
							onChange={handleChange}
							placeholder="Enter max capacity"
						/>
					</Form.Group>
					<Button variant="secondary" onClick={handleCloseModal}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSaveChanges}>
						{selectedItem ? "Save Changes" : "Add Course"}
					</Button>
				</Form>
			</div>
		</div>
	);
};
export default CreateCourse;
