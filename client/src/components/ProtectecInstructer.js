import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectecInstructer = () => {
	const key = sessionStorage.getItem("userRole");
	return key == "Instructors" ? <Outlet /> : <Navigate to="error" />;
};

export default ProtectecInstructer;
