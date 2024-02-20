import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Common = ({ data }) => {
    useEffect(() => {
        console.log("Comman", data)
    })
    return (
        <div>
            {data.sort((a, b) => b.likeCount - a.likeCount).slice(3).map((item) => (
                <div className="d-flex mb-3" key={item.id}>
                    <p className="me-2">title : {item.title}</p>
                    <p className="me-2">description : {item.description}</p>
                    <p className="me-2">amount : {item.amount}</p>
                    <p className="me-2">Like : {item.likeCount}</p>
                    <img src={"http://localhost:1337" + item.picture.url} alt="item" width={50} />
                    <Link to={{ pathname: `./${item.id}` }}>
                        <Button variant="outline-dark">Detail</Button> {/* Use the imported Button component */}
                    </Link>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Common