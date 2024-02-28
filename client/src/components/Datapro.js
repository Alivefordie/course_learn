import React, { useEffect } from "react";

const Datapro = ({ data }) => {
    const data_1 = data[0];
    const entries = data[1];
    const course = data[2];
    const picture = data[3];

    useEffect(() => {
        console.log("data:", data_1);
        console.log("entries", entries);
        console.log("course", course);
        console.log("picture:", picture)
    }, [data_1, entries, course, picture]);

    return (
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
            <div>
                <h2 style={{ fontFamily: "Roboto, sans-serif", fontSize: "24px", color: "#333", borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>Profile Information</h2>
                <div style={{ margin: "10px 0" }}>
                    <img src={`http://localhost:1337${picture}`} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "10px" }} />
                    <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", marginBottom: "5px" }}><strong>Username:</strong> {data_1.username}</p>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", marginBottom: "5px" }}><strong>Email:</strong> {data_1.email}</p>
                </div>
                <div style={{ backgroundColor: "#fff", borderRadius: "5px", padding: "10px" }}>
                    <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "18px", marginBottom: "5px", color: "#333" }}><strong>Course Details:</strong></p>
                    <ul>
                        {course.map((item, index) => (
                            <p key={index} style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", marginBottom: "5px" }}>
                                <strong>{item.name}</strong> - {item.description}
                            </p>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Datapro;
