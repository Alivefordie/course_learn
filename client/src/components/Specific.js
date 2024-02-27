import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const Specific = ({ data }) => {
    const { item } = useParams();
    useEffect(() => {
        console.log("Specific:", data);
        console.log("item", item);
    }, [data, item]);

    const AddCart = async () =>{
      try{
        const response = await axios.get(`http://localhost:1337/api/courses/${item}/toCart`);
        console.log(response)
        if(response.data.AddToCart){
          alert('course add')
        } else if (response.data.RemoveFromCart){
          alert('course remove')
        }
        window.history.back();
      } catch(error) {
        console.error("Error fetching data:", error);
      }
    }

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
                    <Button variant="outline-dark" style={{marginBottom: '10px'}} onClick={AddCart}>add to cart</Button>
                  </div>
                </Container>  
              </div>
            )}       
          </Container>  
          
    );
}

export default Specific;
