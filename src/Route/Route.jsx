import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
// import PrivetRoute from "./PrivetRoute";
import Home from "../page/home/home";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import AdminDashboard from "../Layout/AdminDashboard";
import Admin from "../Page/Admin/Admin/Admin";
import User from "../Page/Admin/User/User";
import InstructorDashboard from "../Layout/InstructorDashboard";
import Dashboard from "../Page/Instructor/Dashboard/Dashboard";
import AddClass from "../Page/Instructor/AddClass/AddClass";
import InstructorPrivetRoute from "./InstructorPrivetRoute";
import MyClass from "../Page/Instructor/MyClass/MyClass";
import AdminPrivetRoute from "./AdminPrivetRoute";
import Class from "../Page/Admin/Class/Class";

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
        path: '/instructor-dashboard',
        element: <InstructorPrivetRoute><InstructorDashboard></InstructorDashboard></InstructorPrivetRoute>,
        children: [
            {
                path: '/instructor-dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/instructor-dashboard/add-class',
                element: <AddClass></AddClass>
            },
            {
                path: '/instructor-dashboard/my-class',
                element: <MyClass></MyClass>,
                loader: () => fetch('http://localhost:5000/my-class')
            },
        ]
    },
    {
        path: '/admin-dashboard',
        element: <AdminPrivetRoute><AdminDashboard></AdminDashboard></AdminPrivetRoute>,
        children: [
            {
                path: '/admin-dashboard',
                element: <Admin></Admin>
            },
            {
                path: '/admin-dashboard/user',
                element: <User></User>
            },
            {
                path: '/admin-dashboard/manage-class',
                element: <Class></Class>,
                loader: () => fetch('http://localhost:5000/manage-class')
            }
        ]
    }
])