import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Toprank = ({ data }) => {
    useEffect(() => {
        console.log("Toprank", data);
    }, [data]); // Added data to the dependency array

    return (
        <div>
            {data.sort((a, b) => b.likeCount - a.likeCount).slice(0, 3).map((item) => (
                <div className="d-flex mb-3" key={item.id}>
                    <p className="me-2">title : {item.title}</p>
                    <p className="me-2">description : {item.description}</p>
                    <p className="me-2">amount : {item.amount}</p>
                    <p className="me-2">Like : {item.likeCount}</p>
                    <img src={"http://localhost:1337" + item.picture.url} alt="item" width={50} />
                    <Link to={{ pathname: `./${item.id}` }}>
                        <Button variant="dark">Detail</Button>
                    </Link>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Toprank;
