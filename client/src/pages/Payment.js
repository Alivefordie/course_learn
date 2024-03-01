import React, { useEffect, useState } from "react";
import styles from "../css/PayCss.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import ax from "../conf/ax";
import conf from "../conf/main";
import Spinner from "../components/Spinner";

const Payment = () => {
    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [phone, setPhone] = useState("");
    const [Id, setID] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slip, setSlip] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ax.get(conf.findanything);
                console.log(response.data)

                const data = response.data.entries.map((entry) => entry.course);
                // console.log(data)
                // setID(data.map((course) => course.id));
                setData(data);
                calculateTotalPrice(data);

                const filteredData = response.data.entries.filter((entry) => entry.cart !== null);
                setFilter(filteredData);
                setLoading(false);
            } catch (error) {
                console.error("Error occurred:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const test = async () => {
        try {
            const jwtToken = sessionStorage.getItem("auth.jwt");
            if (!jwtToken) {
                console.error("JWT token not found.");
                return;
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

            const response = await axios.get("http://localhost:1337/api/users/me?populate[entries][populate][course]=*");

            const nullEnrollEntries = response.data.entries.filter(entry => entry.enroll === null);

            const courseIdWithNullEnroll = nullEnrollEntries.map(entry => entry.course.id);
            setID(courseIdWithNullEnroll)
            console.log("Course IDs with enroll === null:", courseIdWithNullEnroll);
        } catch (error) {
            console.log("Failed to test", error);
        }
    }


    useEffect(()=>{
        test()
    },[])


    const calculateTotalPrice = (courses) => {
        const totalPrice = courses.reduce((acc, course) => {
            if (course.price) {
                return acc + course.price;
            }
            return acc;
        }, 0);
        setTotalPrice(totalPrice);
    };

    const handleConfirm = () => {
        setShowModal(true);
    };

    const handleFileChange = (event) => {
        setSlip(event.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleNext = () => {
        if (progress < 100) {
            setProgress(Math.min(progress + 33.33, 100));
        }
        if (progress >= 66) {
            handleCloseModal();
            setProgress(0);
            setName("");
            setEmail("");
            setDate("");
            setPhone("");
            setData([]);
            success(Id);
            sendslip();
        }
    };

    useEffect(() => {
        console.log(Id);
    }, [Id]);

    const success = async (Id) => {
        try {
            setLoading(true);

            const jwtToken = sessionStorage.getItem("auth.jwt");
            if (!jwtToken) {
                console.error("JWT token not found.");
                return;
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

            const response = await axios.get(`http://localhost:1337/api/enroll/${Id}`);
            console.log(response);
            window.location.reload();
            ////fix it relate
        } catch {
            console.log("fail");
            setLoading(false);
        }
    };

    const sendslip = async () => {
        try {
            const jwtToken = sessionStorage.getItem("auth.jwt");
            if (!jwtToken) {
                console.error("JWT token not found.");
                return;
            }

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

            const formData = new FormData();
            formData.append("files", slip, slip.name);
            console.log(formData);

            const uploadResponse = await axios.post("http://localhost:1337/api/upload/", formData);
            console.log("File uploaded successfully:", uploadResponse.data);
            const pictureId = uploadResponse.data[0].id;
            console.log(pictureId);

            const postData = {
                paymentDate: new Date(),
                paymentAmout: totalPrice,
                slip: pictureId,

            };

            const transactionResponse = await axios.post("http://localhost:1337/api/tansactions", {
                data: postData,
            }); // Corrected variable name here
            console.log("Slip uploaded successfully. Response:", transactionResponse.data);
        } catch (error) {
            console.error("Error uploading slip:", error);
        }
    };

    return (
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            {loading ? (
                <div className="body">
                    <Spinner />
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.body}>
                        <div className={styles.ct1}>
                            <p>.</p>
                            {filter.length === 0 ? (
                                <p className={styles.no_cart}>No course in cart</p>
                            ) : (
                                <div className={styles.ct1_1}>
                                    {filter.map((item) => (
                                        <div key={item.id}>
                                            <p>Title: {item.course.title}</p>
                                            <p>Price: {item.course.price}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {filter.length > 0 && (
                                <div className={styles.totalPrice}>TotalPrice: {totalPrice}</div>
                            )}
                        </div>
                        <div className={styles.ct2}>
                            Name
                            <br />
                            <input
                                className={styles.input}
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            Email
                            <br />
                            <input
                                className={styles.input}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            Date
                            <br />
                            <input
                                className={styles.input}
                                placeholder="Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <br />
                            Phone
                            <br />
                            <input
                                className={styles.input}
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className={styles.ct3}>
                            .
                            <div className={styles.payment}>
                                <p>CHOOSE PAYMENT</p>
                                <p>METHOD</p>
                                <br />
                                <div className={styles.choosebank}>
                                    <img src="/a.png" width={50} height={50} alt="Bank A" />
                                    <img src="/b.png" width={50} height={50} alt="Bank B" />
                                    <img src="/c.png" width={50} height={50} alt="Bank C" />
                                    <br />
                                    <img src="/d.png" width={50} height={50} alt="Bank D" />
                                    <img src="/e.png" width={50} height={50} alt="Bank E" />
                                    <img src="/f.png" width={50} height={50} alt="Bank F" />
                                    <br />
                                    <img src="/g.png" width={50} height={50} alt="Bank G" />
                                </div>
                                {data.length === 0 ? (
                                    <p>Cannot confirm when cart is empty</p>
                                ) : (
                                    <div className={styles.confirm}>
                                        <Button onClick={handleConfirm} variant="dark">
                                            Confirm
                                        </Button>
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
                            {progress >= 0 && (
                                <div>
                                    <p>Step 1: Payment Details: {totalPrice} บาท</p>
                                </div>
                            )}
                            {progress >= 33 && (
                                <div>
                                    <p>Step 2: QR Code</p>
                                    <img src="/qrcode.png" alt="QR Code" className={styles.qrCode} />
                                    <input type="file" accept="image/*" name="file" onChange={handleFileChange} />
                                </div>
                            )}
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
            )}
        </div>
    );
};

export default Payment;
