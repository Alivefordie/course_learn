import React, { useEffect } from "react";

const Specific = ({ data }) => {
    useEffect(() => {
        console.log("Specific:", data);
    }, [data]); 

    return (
        <div>
            {data && data.attributes && (
                <div>
                    <h1>Title: {data.attributes.title}</h1>
                    <p>Description: {data.attributes.description}</p>
                    <p>Count: {data.attributes.count}</p>
                    <p>linkCount: {data.attributes.likeCount}</p>
                </div>
            )}
        </div>
    );
}

export default Specific;
