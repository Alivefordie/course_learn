import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Spinner, Alert, Form } from "react-bootstrap";
import ax from "../../conf/ax";
import conf from "../../conf/ax";

const TopIns = ({ data }) => {
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

	const handleAddCourse = () => {
		setEditedItem({
			title: "",
			description: "",
			price: "",
			maxCapacity: "",
		});
		setShowModal(true);
	};

	const handleDelete = async (itemId) => {
		try {
			const response = await ax.delete(`${conf.apiUrlPrefix}/courses/${itemId}`);
			console.log("Delete Response:", response);
		} catch (error) {
			console.error("Error deleting course:", error);
			setError("Failed to delete course. Please try again.");
		}
	};

	return (
		<div className="card-container">
			<Button variant="primary" onClick={handleAddCourse}>
				Add Course
			</Button>
			{loading && <Spinner animation="border" role="status" />}
			{error && <Alert variant="danger">{error}</Alert>}
			{!loading &&
				!error &&
				data.map((item) => (
					<Card key={item.id} style={{ width: "18rem", margin: "10px" }}>
						<Card.Body>
							<Card.Title>{item.title}</Card.Title>
							<Card.Text>
								<img src={conf.url + item.picture?.url} alt="item" width={50} />
								<br />
								Price: {item.price}
								<br />
								Max Capacity: {item.maxCapacity}
								<br />
								Description: {item.description}
							</Card.Text>
							<Button variant="primary" onClick={() => handleEditClick(item)}>
								Edit
							</Button>
							<Button variant="danger" onClick={() => handleDelete(item.id)}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				))}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>{selectedItem ? "Edit Course" : "Add Course"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSaveChanges}>
						{selectedItem ? "Save Changes" : "Add Course"}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default TopIns;
