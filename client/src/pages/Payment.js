import React, { useEffect, useState } from "react";
import styles from "../css/PayCss.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios"; // Import axios for making HTTP requests

const Payment = () => {
    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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
            calculateTotalPrice(response.data.courses); // Call calculateTotalPrice after fetching data
        } catch(error) {
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
        fetchData(); // Fetch data when the component mounts
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.body}>

                <div className={styles.ct1}>
                    1
                    <div className={styles.ct1_1}>
                    {data.map((item) => (
                  <div key={item.id}>
                    <p>Title: {item.title}</p>
                    <p>Price: {item.price}</p>
                  </div>
                ))} 
                    </div>
                    <div className={styles.totalPrice}>
                        TotalPrice: {totalPrice} 
                    </div >
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
                    3
                    <div className={styles.payment}>
                        <p>CHOOSE PAYMENT</p>
                        <p>METHOD</p>
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
