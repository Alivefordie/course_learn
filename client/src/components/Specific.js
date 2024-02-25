import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
const Specific = ({ data }) => {
    const { item } = useParams();
    useEffect(() => {
        console.log("Specific:", data);
        console.log("item", item);
    }, [data, item]);



    return (
        <div  className="body">
            {data && data.attributes && (
                <div>
                    <Container className="newest-col">                      
                    <img src={"http://localhost:1337" + data.attributes.picture.data.attributes.url} alt="item" width={50} />
                    <h1>Title: {data.attributes.title}</h1>
                    <p>Description: {data.attributes.description}</p>
                    <p>amount: {data.attributes.amount}</p>
                    <p>linkCount: {data.attributes.likeCount}</p>
                    <div style={{ display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="outline-dark">add to cart</Button>
                    </div>                  
                    </Container>
                </div>
            )}
        </div>
        
    );
}

export default Specific;
