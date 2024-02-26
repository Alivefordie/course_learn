import React, { useEffect, useState } from "react";
import styles from "../css/PayCss.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";

const Payment = () => {
    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);

    const fetchData = async () => {
        try {
            const jwtToken = sessionStorage.getItem('jwtToken');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            const response = await axios.get("http://localhost:1337/api/users/me?populate=*");
            console.log(response.data.courses);
            setData(response.data.courses);
            calculateTotalPrice(response.data.courses);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    const calculateTotalPrice = (courses) => {
        const totalPrice = courses.reduce((acc, course) => {
            if (course.price) {
                return acc + course.price;
            }
            return acc;
        }, 0);
        setTotalPrice(totalPrice);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleConfirm = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setProgress(0);
    }

    const handleNext = () => {
        if (progress < 100) {
            setProgress(Math.min(progress + 33.33, 100));
        }
        if (progress > 70) {
            handleCloseModal();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.ct1}>
                    <p>.</p>
                    {data.length === 0 ? (
                        <p className={styles.no_cart}>No course in cart</p>
                    ) : (
                        <div className={styles.ct1_1}>
                            {data.map((item) => (
                                <div key={item.id}>
                                    <p>Title: {item.title}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.length > 0 && (
                        <div className={styles.totalPrice}>
                            TotalPrice: {totalPrice}
                        </div>
                    )}
                </div>
                <div className={styles.ct2}>
                    Name
                    <br />
                    <input className={styles.input} placeholder="Name" />
                    <br />
                    Email
                    <br />
                    <input className={styles.input} placeholder="email" />
                    <br />
                    Date
                    <br />
                    <input className={styles.input} placeholder="date" />
                    <br />
                    Phone
                    <br />
                    <input className={styles.input} placeholder="phone" />
                </div>
                <div className={styles.ct3}>
                    .
                    <div className={styles.payment}>
                        <p>CHOOSE PAYMENT</p>
                        <p>METHOD</p>
                        <br />
                        <div className={styles.choosebank}>
                        <img src="/logo512.png" width={50} height={50}></img>
                        <img src="/logo512.png" width={50} height={50}></img>
                        <img src="/logo512.png" width={50} height={50}></img>
                        <br/>
                        <img src="/logo512.png" width={50} height={50}></img>
                        <img src="/logo512.png" width={50} height={50}></img>
                        <img src="/logo512.png" width={50} height={50}></img>
                        <br/>
                        <img src="/logo512.png" width={50} height={50}></img>
                        </div>
                        {data.length === 0 ? (
                            <p>Cannot confirm when cart is empty</p>
                        ) : (
                            <div className={styles.confirm}>
                                <Button onClick={handleConfirm} variant="dark">Confirm</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {progress >= 0 &&
                        <div>
                            <p>Step 1: Payment Details: {totalPrice} บาท</p>
                        </div>
                    }
                    {progress >= 33 &&
                        <div>
                            <p>Step 2: QR Code</p>
                            <img src="/qrcode.png" alt="QR Code" className={styles.qrCode} />
                        </div>
                    }
                    {progress >= 66 && <p>Step 3: Completion</p>}
                    <ProgressBar now={progress} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleNext}>
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Payment;
