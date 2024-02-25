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
        <Container className="body">
            {data && data.attributes && (
              <div>
                <Container className="course-info"> 
                  <div> 
                    <div className="course-title">        
                    <img src={"http://localhost:1337" + data.attributes.picture.data.attributes.url} alt="item" width={300} />
                    <h4>Title: {data.attributes.title}</h4>
                    </div>       
                    <p style={{wordWrap: 'break-word'}}>Description: {data.attributes.description}</p>
                    <p>Amount: {data.attributes.amount}</p>
                    <p>Link Count: {data.attributes.likeCount}</p>
                  </div>
                               
                  <div style={{marginTop: 'auto', display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="outline-dark" style={{marginBottom: '10px'}}>add to cart</Button>
                  </div>
                </Container>  
              </div>
            )}       
          </Container>  
          
    );
}

export default Specific;
