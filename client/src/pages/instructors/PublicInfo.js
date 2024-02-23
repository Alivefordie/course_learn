import './App.css';
import NavbarTop from './components/NavbarTop';
import NavbarLink from './components/NavbarLink';
import { BsBell } from "react-icons/bs";
import React,{ useEffect,useState} from 'react';


function Public() {

  
 const [courses1, setCourses1] = useState([]);
 
 const Getdata = async () => {
  try {
      const response = await fetch(`http://localhost:1337/api/courses`);
      const coursesData = await response.json();
      setCourses1(coursesData);
      console.log(coursesData);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}





  return (
    
    <div >
       
       <div className="Nav">
          <div>
          <NavbarTop NavbarLink={NavbarLink} />
          
          </div>
       </div>

       <div className="Container">
          <p className = "Font">myCourse</p>
       </div>

       <div className = "Container2">
         <p2 className="Font2">Inprogress</p2>
       </div>
        
       <div className = "Container4">
         <p3 className = "rectangle">
          <h1 className="image">
            <h2 className="title">
              
            </h2>
          </h1>
          <h2 className = "description"> 

          </h2>
          <h3 className = "progress">

          </h3>
         </p3>
         
       </div>
        
       <div className="Footer">

       </div>
    </div>

  );
}

export default Public;
