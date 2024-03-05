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
import ax from "../conf/ax";
import conf from "../conf/main";
import { Link } from "react-router-dom";


const MyCoursesStudent = () => {
    return(
        <div>
            <NavbarLink/>
            
        </div>
    );
};

export default MyCoursesStudent;

