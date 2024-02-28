import React, { useEffect }  from "react";


const Datapro = ({data}) =>{
    
    const data_1 = data[0];
    const entries = data[1]
    const course = data[2]


    useEffect(() => {
        console.log("data:",data_1)
        console.log("entries",entries)
        console.log("course",course)
    }, [data_1,entries,course])


    return(
        <div>

        </div>
    )

}

export default Datapro;