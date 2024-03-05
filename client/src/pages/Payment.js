import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ProgressBar,
  Form,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import Spinner from "../components/Spinner";
import ax from "../conf/ax";
import conf from "../conf/main";
import { useNavigate } from "react-router-dom";
import NavbarLink from "../components/NavbarLink";
import styles from "../css/PayCss.module.css";

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
  const [member, setmember] = useState();
  // const [ids, setids] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("ids", ids);
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await ax.get(conf.apiUrlPrefix + "/cart")
        console.log("resonse:", response1.data.data.map((item) => item.attributes.price))
        // const response = await ax.get(conf.findanything);
        // console.log(response.data)
        // setids(response.data.id);

        // const data = response.data.entries.map((entry) => entry.course);
        // console.log(data)

        const data = response1.data.data.map((item) => item.attributes.price)
        setData(response1.data.data);
        calculateTotalPrice(data);
        // const filteredData = response.data.entries.filter(
        //   (entry) => entry.cart !== null
        // );
        // setFilter(filteredData);

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

      const response = await ax.get(
        `${conf.apiUrlPrefix}/users/me?populate[entries][populate][course]=*`
      );
      setmember(response.data.id);
      const nullEnrollEntries = response.data.entries.filter(
        (entry) => entry.enroll === null
      );

      const courseIdWithNullEnroll = nullEnrollEntries.map(
        (entry) => entry.course.id
      );
      setID(courseIdWithNullEnroll);
    } catch (error) {
      console.log("Failed to test", error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  const calculateTotalPrice = (courses) => {

    const totalPrice = courses.reduce((acc, course) => {
      if (course) {
        return acc + course;
      }
      return acc;
    }, 0);
    console.log("total:",totalPrice)
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
    console.log("test:", Id);
  }, [Id]);

  const success = async (Id) => {
    try {
      setLoading(true);

      const jwtToken = sessionStorage.getItem("auth.jwt");
      if (!jwtToken) {
        console.error("JWT token not found.");
        return;
      }

      const response = await ax.get(`${conf.apiUrlPrefix}/enroll/${Id}`);
      console.log(response);
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

      const formData = new FormData();
      formData.append("files", slip, slip.name);

      const uploadResponse = await ax.post(
        `${conf.apiUrlPrefix}/upload/`,
        formData
      );
      console.log("File uploaded successfully:", uploadResponse.data);
      const pictureId = uploadResponse.data[0].id;

      const postData = {
        paymentDate: new Date(),
        paymentAmout: totalPrice,
        slip: pictureId,
        member: member,
      };

      const transactionResponse = await ax.post(
        `${conf.apiUrlPrefix}/tansactions`,
        {
          data: postData,
        }
      );
      navigate("/mycourses");
      console.log(
        "Slip uploaded successfully. Response:",
        transactionResponse.data
      );
    } catch (error) {
      console.error("Error uploading slip:", error);
    }
  };

  return (
    <div className="body">
      <NavbarTop NavbarLink={NavbarLink} />
      {loading ? (
        <Spinner />
      ) : (
        <Container className={styles.paymentContainer} sm="3" md="4">
          <Row>
            <Col className={styles.orderCol}>
              <div
                id="orderList"
                data-spy="scroll"
                data-target=".navbar"
                className={styles.orderListContainer} // Add a custom class for styling
              >
                {data.map((item) => ( // Slice the filter array to display only the first 2 items
                  <Card
                    className="d-flex flex-row"
                    style={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      marginLeft: "15px",
                    }}
                    key={item.id}
                  >
                    <div
                      onClick={() => navigate(`/courses/${item.id}`)}
                      style={{ cursor: "pointer" }}
                      className="image-col"
                    >
                      {console.log(item)}
                      <Card.Img
                        className="course-image"
                        variant="left"
                        src={conf.url + item.attributes.picture.data.attributes.url}
                      />
                    </div>
                    <div className="body-col">
                      <Card.Body
                        onClick={() =>
                          navigate(`/courses/${item.id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Title>{item.attributes.title}</Card.Title>
                        <Card.Text>Details</Card.Text>
                        <Card.Text className="m-0">
                          ระยะเวลา {item.attributes.duration}
                        </Card.Text>
                      </Card.Body>
                    </div>
                  </Card>
                ))}
              </div>
              {data.length > 0 && (
                <div className={styles.totalPrice}>
                  TotalPrice: {totalPrice}
                </div>
              )}
              <Row className={styles.InfoInput}>
                <Col md={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
            <Col className={styles.paymentMethod}>
              <Container className={styles.methodCon}>
                <h1 className={styles.methodText}>
                  <p>CHOOSE PAYMENT</p>
                  <p>METHOD</p>
                </h1>
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
                  <div className={styles.confirmBtn}>
                    <Button
                      onClick={handleConfirm}
                      variant="dark"
                      className={styles.confirmBtn}
                    >
                      Confirm
                    </Button>
                  </div>
                )}
              </Container>
            </Col>
          </Row>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Payment Process</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                {progress >= 0 && (
                  <div>
                    <p>Step 1: Payment Details: {totalPrice} บาท</p>
                  </div>
                )}
                {progress >= 33 && (
                  <div>
                    <p>Step 2: Upload Payment Slip</p>
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
                {progress >= 66 && <p>Step 3: Completion</p>}
                <ProgressBar now={progress} className="mt-3" />
              </div>
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
        </Container>
      )}
    </div>
  );
};
export default Payment;
