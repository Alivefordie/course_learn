import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import InsSee from "./pages/instructors/InsSee";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Pag1 from "./pages/instructors/Page1";
import Pag2 from "./pages/instructors/Page2";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import MyCourses from "./pages/myCourses";
import History from "./pages/History";
import SpecificCourse from "./pages/instructors/SpecificCourse";
import CreateCourse from "./pages/instructors/CreateCourse";
import { ContextProvider } from "./context/AuthContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/page1",
		element: <Pag1 />,
	},
	{
		path: "/page1/:item",
		element: <Pag2 />,
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
		path: "/Instructors/:id",
		element: <SpecificCourse />,
	},
	{
		path: "/Instructors/create",
		element: <CreateCourse />,
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
