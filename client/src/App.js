import "./App.css";
import NavbarTop from "./components/NavbarTop";
import NavbarLink from "./components/NavbarLink";
import { BsBell } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import AllCourse from "./pages/allCourse";
import Register from "./pages/Register";

function App() {
  return (
    <div className="body">
      <Register/>
    </div>
  );
}

export default App;
