import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
// import PrivetRoute from "./PrivetRoute";
import Home from "../page/home/home";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Dashboard from "../Layout/Dashboard";
import Admin from "../Page/Admin/Admin/Admin";
import User from "../Page/Admin/User/User";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructor',
                element: <h2>INSTRUCTOR</h2>
            },
            {
                path: '/class',
                element: <h2>Class</h2>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/admin/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/admin/dashboard',
                element: <Admin></Admin>
            },
            {
                path: '/admin/dashboard/user',
                element: <User></User>
            }
        ]
    }
])