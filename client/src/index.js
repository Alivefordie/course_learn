import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import InsSee from "./pages/instructors/InsSee";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CourseInfo from "./pages/instructors/CourseInfo";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import MyCourses from "./pages/myCourses";
import History from "./pages/History";
import CreateCourse from "./pages/instructors/CreateCourse";
import { ContextProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import Management from "./pages/superadmin/Management";
import Datacourse from "./components/Ins/Datacourse";
import ForgotPassword from "./pages/forgotPassword";
import NewPassword from "./pages/newPassword";
import EditProfile from "./components/EditProfile";
import CourseSyllabus from "./pages/coursesyllabus";
import CourseV from "./components/member/CourseV";
import Coursedata from "./pages/instructors/Coursedata";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/courses/:item",
		element: <CourseInfo />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/payment",
		element: <Payment />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/mycourses",
		element: <MyCourses />,
	},
	{
		path: "/history",
		element: <History />,
	},
	{
		path: "/Instructors",
		element: <InsSee />,
	},
	{
		path: "/Instructors/create",
		element: <CreateCourse />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/superadmin",
		element: <Management />,
	},
	{
		path: "/Instructors/:course",
		element: <Coursedata />,
	},
	{
		path: "/ForgotPassword",
		element: <ForgotPassword />,
	},
	{
		path: "/NewPassword",
		element: <NewPassword />,
	},
	{
		path: "/profile/edit-profile/:id",
		element: <EditProfile />,
	},
	{
		path: "/mycourses/:item",
		element: <CourseSyllabus />,
	},
	{
		path: "/mycourses/study/:item",
		element: <CourseV />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ContextProvider>
			<RouterProvider router={router} />
		</ContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
