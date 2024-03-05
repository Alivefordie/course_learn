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
import ForgotPassword from "./pages/forgotPassword";
import NewPassword from "./pages/newPassword";
import EditProfile from "./components/EditProfile";
<<<<<<< HEAD
import myCourses from "./pages/myCoursesStudent";
import MyCoursesStudent from "./pages/myCoursesStudent";

=======
import CourseSyllabus from "./pages/coursesyllabus";
import CourseV from "./components/member/CourseV";
import Coursedata from "./pages/instructors/Coursedata";
import ProtectedRoutes from "./components/ProtectecRoute";
import ProtectectMember from "./components/ProtectectMember";
import ProtectecInstructer from "./components/ProtectecInstructer";
import ProtectecSuperadmin from "./components/ProtectecSuperadmin";
import Error from "./pages/Error";
>>>>>>> 20c07217a18b7d3fd9f89c3b8f235d8f4aa6c53b

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
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
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
		element: <ProtectedRoutes />,
		children: [
			{
				element: <ProtectectMember />,
				children: [
					{
						path: "/profile",
						element: <Profile />,
					},
					{
						path: "/profile/edit-profile/:id",
						element: <EditProfile />,
					},
					{
						path: "/history",
						element: <History />,
					},
					{
						path: "/mycourses",
						element: <MyCourses />,
					},
					{
						path: "/mycourses/:item",
						element: <CourseSyllabus />,
					},
					{
						path: "/mycourses/study/:item",
						element: <CourseV />,
					},
					{
						path: "/cart",
						element: <Cart />,
					},
					{
						path: "/payment",
						element: <Payment />,
					},
				],
			},
			{
				element: <ProtectecInstructer />,
				children: [
					{
						path: "/Instructors",
						element: <InsSee />,
					},
					{
						path: "/Instructors/create",
						element: <CreateCourse />,
					},
					{
						path: "/Instructors/:course",
						element: <Coursedata />,
					},
				],
			},
			{
				element: <ProtectecSuperadmin />,
				children: [
					{
						path: "/superadmin",
						element: <Management />,
					},
				],
			},
		],
	},
<<<<<<< HEAD
	{
		path: "/mycourses/study/:item",
		element: <MyCoursesStudent />,
	},
=======
	{ path: "*", element: <Error /> },
>>>>>>> 20c07217a18b7d3fd9f89c3b8f235d8f4aa6c53b
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
