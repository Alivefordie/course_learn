import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import "../App.css";
import Spinner from "../components/Spinner";
import fetchOwnerCourses from "../components/Owner";

const MyCoursesStudent = () => {
    return(
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            <h1>hi</h1>
            
        </div>
    );
};

export default MyCoursesStudent;

