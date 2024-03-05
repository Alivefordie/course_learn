import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectectMember = () => {
	const key = sessionStorage.getItem("userRole");
	return key == "student" ? <Outlet /> : <Navigate to="error" />;
};

export default ProtectectMember;
