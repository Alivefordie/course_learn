import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Spinner, Alert, Form } from "react-bootstrap"; // Import Bootstrap components

const TopIns = ({ data }) => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for editing
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Logic to save changes goes here
    // You can send the edited data to the server or update state as needed
    // For simplicity, this example just closes the modal
    handleCloseModal();
  };

  const handleChange = (e) => {
    setSelectedItem({
      ...selectedItem,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card-container">
      {loading && <Spinner animation="border" role="status" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading &&
        !error &&
        data.map((item) => (
          <Card key={item.id} style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                Price: {item.price}
                <br />
                Max Capacity: {item.maxCapacity}
                <br />
                Like Count: {item.likeCount}
                <br />
                Description: {item.description}
              </Card.Text>
              <Button variant="primary" onClick={() => handleEditClick(item)}>
                Edit
              </Button>
            </Card.Body>
          </Card>
        ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedItem.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={selectedItem.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={selectedItem.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formMaxCapacity">
                <Form.Label>Max Capacity</Form.Label>
                <Form.Control
                  type="text"
                  name="maxCapacity"
                  value={selectedItem.maxCapacity}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLikeCount">
                <Form.Label>Like Count</Form.Label>
                <Form.Control
                  type="text"
                  name="likeCount"
                  value={selectedItem.likeCount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopIns;
