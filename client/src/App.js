import "./App.css";
import NavbarTop from "./components/NavbarTop";
import NavbarLink from "./components/NavbarLink";
import { BsBell } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Register from "./pages/Register";
import AllCourse from "./pages/allCourse";

function App() {
  return (
    <div className="body">
      <AllCourse />
    </div>
  );
}

export default App;
