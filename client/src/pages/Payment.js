import React from "react";
import styles from "../css/PayCss.module.css";
import Button from "react-bootstrap/Button";

const Payment = () => {
    return (
        <div className={styles.container}>
            <div className={styles.body}>

                <div className={styles.ct1}>
                    1
                    <div className={styles.ct1_1}>
                        1.1
                    </div>
                    <div className={styles.totalPrice}>
                        totalPrice:
                    </div >
                </div>
                <div className={styles.ct2}>
                    Name
                    <br />
                    <input className={styles.input} placeholder="Name" />
                    <br />
                    email
                    <br />
                    <input className={styles.input} placeholder="email" />
                    <br />
                    date
                    <br />
                    <input className={styles.input} placeholder="date" />
                    <br />
                    phone
                    <br />
                    <input className={styles.input} placeholder="phone" />

                </div>
                <div className={styles.ct3}>
                    3
                    <div className={styles.payment}>
                        Choose payment
                        <br />
                        <div className={styles.confirm}>
                            <Button variant="dark">Detail</Button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Payment;
