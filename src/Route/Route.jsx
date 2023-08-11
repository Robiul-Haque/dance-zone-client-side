import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import StudentPrivetRoute from "./InstructorPrivetRoute";
import InstructorPrivetRoute from "./InstructorPrivetRoute";
import AdminPrivetRoute from "./AdminPrivetRoute";
import Home from "../page/Client_side/home/home";
import AllCourse from "../Page/Client_side/Course/Course"
import StudentDashboard from "../Page/Client_side/Dashboard/Dashboard";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import AdminDashboard from "../Layout/AdminDashboard";
import Admin from "../Page/Admin/Admin/Admin";
import User from "../Page/Admin/User/User";
import InstructorDashboard from "../Layout/InstructorDashboard";
import Dashboard from "../Page/Instructor/Dashboard/Dashboard";
import AddCourse from "../Page/Instructor/AddCourse/AddCourse";
import MyCourse from "../Page/Instructor/MyCourse/MyCourse";
import SelectedCourse from "../Page/Client_side/Dashboard/Component/SelectedCourse";
import EnrolledCourse from "../Page/Client_side/Dashboard/Component/EnrolledCourse";
import PaymentHistory from "../Page/Client_side/Dashboard/Component/PaymentHistory";
import Course from "../Page/Admin/Course/Course";
import EditCourse from "../Page/Instructor/MyCourse/EditCourse";
import Instructor from "../Page/Client_side/Instructor/Instructor";

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
                element: <Instructor></Instructor>,
                loader: () => fetch('http://localhost:5000/all-instructor')
            },
            {
                path: '/Course',
                element: <AllCourse></AllCourse>,
                loader: () => fetch('http://localhost:5000/all-course')
            },
            {
                path: '/student/dashboard',
                element: <StudentPrivetRoute><StudentDashboard></StudentDashboard></StudentPrivetRoute>,
                children: [
                    {
                        path: '/student/dashboard/selected-course',
                        element: <SelectedCourse></SelectedCourse>,
                    },
                    {
                        path: '/student/dashboard/enrolled-course',
                        element: <EnrolledCourse></EnrolledCourse>
                    },
                    {
                        path: '/student/dashboard/payment-history',
                        element: <PaymentHistory></PaymentHistory>
                    }
                ]
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
                path: '/instructor-dashboard/add-course',
                element: <AddCourse></AddCourse>
            },
            {
                path: '/instructor-dashboard/my-course',
                element: <MyCourse></MyCourse>,
            },
            {
                path: '/instructor-dashboard/my-course/edit/:id',
                element: <EditCourse></EditCourse>,
                loader: ({ params }) => fetch(`http://localhost:5000/my-course/edit/show-data/${params?.id}`)
            }
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
                path: '/admin-dashboard/manage-course',
                element: <Course></Course>
            }
        ]
    }
])