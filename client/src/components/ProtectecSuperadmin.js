import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectecSuperadmin = () => {
	const key = sessionStorage.getItem("userRole");
	return key == "Superadmin" ? <Outlet /> : <Navigate to="error" />;
};

export default ProtectecSuperadmin;
