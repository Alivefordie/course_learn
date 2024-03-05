import React from "react";
import CourseV from "../components/member/CourseV";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";

const Study = () =>{
    return(
        <div className="body">
            <NavbarTop NavbarLink={NavbarLink}/>
            <CourseV />
        </div>
    )
}
export default Study;