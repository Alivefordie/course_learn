import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import conf from "../conf/main";
const ProtectedRoutes = () => {
	const key = sessionStorage.getItem(conf.jwtSessionStorageKey);
	return key ? <Outlet /> : <Navigate to="error" />;
};

export default ProtectedRoutes;
