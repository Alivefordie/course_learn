import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Toprank = ({ data }) => {

    useEffect(() => {
        console.log("Toprank", data)
    })

    return (
        <div>
            {data.sort((a, b) => b.attributes.likeCount - a.attributes.likeCount).slice(0, 3).map((item) => (
                <div className="d-flex mb-3" key={item.id}>
                    <p className="me-2">title : {item.attributes.title}</p>
                    <p className="me-2">description : {item.attributes.description}</p>
                    <p className="me-2">count : {item.attributes.count}</p>
                    <p className="me-2">Like : {item.attributes.likeCount}</p>
                    <Link to={{ pathname: `./${item.id}` }}>
                        <Button variant="outline-dark">Detail</Button>
                    </Link>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Toprank;
