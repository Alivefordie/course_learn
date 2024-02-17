import React, { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const Specific = () => {
const { item } = useParams();

    useEffect(() => {
        console.log("item", item);
    }, [item]);

    const Like = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/courses/${item}`);
            console.log(response.data);
        } catch (error) {
            console.log("Failed to confirm:", error);
        }
    }

    return (
        <div>
            <div>
                <Button onClick={Like} variant="outline-dark">ลงเรียน</Button>
            </div>
        </div>
    );
}

export default Specific;
