import React, { useEffect, useState } from "react";
// import Datapro from "../components/Datapro";
// import axios from "axios";
import conf from "../conf/main";
import ax from "../conf/ax";

const Profile = () =>{
const [data,setdata] = useState({})
    const fetchProfile = async() =>{ 
        try{
            const response = await ax.get(conf.Profile); 
            console.log(response.data); 
            setdata(response.data)
        }
        catch(error){
            console.log("fail");
        }
    };

    useEffect(()=>{
        fetchProfile(); 
    },[]);

    return(
        <div>
            profile132
            <p>username:{data.username}</p>
        </div>
    );
};

export default Profile;
