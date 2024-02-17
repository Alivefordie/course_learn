import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
const Specific = ({ data }) => {
    const { item } = useParams();
    useEffect(() => {
        console.log("Specific:", data);
        console.log("item", item);
    }, [data, item]);



    return (
        <div>
            {data && data.attributes && (
                <div>
                    <h1>Title: {data.attributes.title}</h1>
                    <p>Description: {data.attributes.description}</p>
                    <p>amount: {data.attributes.amount}</p>
                    <p>linkCount: {data.attributes.likeCount}</p>
                    <Button variant="outline-dark">ลงเรียน</Button>
                </div>
            )}
        </div>
    );
}

export default Specific;
