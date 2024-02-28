import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Datapro = ({ data }) => {
    const data_1 = data[0];
    const entries = data[1];
    const picture = data[3];

    useEffect(() => {
        console.log("data:", data_1);
        console.log("entries", entries);
        console.log("picture:", picture)
    }, [data_1, entries, picture]);


    const filteredEntries = entries.filter(entry => entry.cart === null);
    console.log("filteredEntries:", filteredEntries);
    

    return (
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <div>
                <h2 style={{ fontFamily: "Roboto, sans-serif", fontSize: "24px", color: "#333", borderBottom: "2px solid #ccc", paddingBottom: "10px", marginBottom: "20px" }}>Profile Information</h2>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <img src={`http://localhost:1337${picture}`} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }} />
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", marginBottom: "10px" }}><strong>Username:</strong> {data_1.username}</p>
                        <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", marginBottom: "10px" }}><strong>Email:</strong> {data_1.email}</p>
                    </div>
                </div>
                <div style={{ backgroundColor: "#fff", borderRadius: "5px", padding: "20px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "18px", marginBottom: "20px", color: "#333" }}><strong>My Course Details:</strong></p>
                    <ul style={{ padding: "0", margin: "0" }}>
                        {filteredEntries.map((entry, index) => (
                            <li key={index} style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", marginBottom: "10px", listStyleType: "none" }}>
                                <Link to="#" className="custom-link">
                                    <strong>{entry.course.title}</strong>
                                    <br/>
                                    - {entry.course.description} 
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Datapro;
