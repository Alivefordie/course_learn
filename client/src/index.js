import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Pag1 from './pages/instructors/Page1';
import Pag2 from './pages/instructors/Page2';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Register from './pages/Register';
import MyCourses from './pages/myCourses';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/page1',
    element: <Pag1 />,
  },
  {
    path: '/page1/:item',
    element: <Pag2 />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/payment',
    element: <Payment />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/mycourses',
    element: <MyCourses />,
  },

  
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
