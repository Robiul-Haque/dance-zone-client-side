import { createBrowserRouter } from "react-router-dom";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Main from "../layout/Main";
import Home from "../page/Frontend/Home/Home";
import Instructor from "../Page/Frontend/Instructor/Instructor";
import AllCourse from "../Page/Frontend/Course/Course";
import StudentPrivetRoute from "./InstructorPrivetRoute";
import StudentDashboard from "../Layout/StudentDashboard";
import SelectedCourse from "../Page/Frontend/StudentDashboard/SelectedCourse";
import EnrolledCourse from "../Page/Frontend/StudentDashboard/EnrolledCourse";
import PaymentHistory from "../Page/Frontend/StudentDashboard/PaymentHistory";
import InstructorPrivetRoute from "./InstructorPrivetRoute";
import InstructorDashboard from "../Layout/InstructorDashboard";
import Dashboard from "../Page/Backend/Instructor/Dashboard/Dashboard";
import AddCourse from "../Page/Backend/Instructor/AddCourse/AddCourse";
import MyCourse from "../Page/Backend/Instructor/MyCourse/MyCourse";
import EditCourse from "../Page/Backend/Instructor/MyCourse/EditCourse";
import AdminPrivetRoute from "./AdminPrivetRoute";
import AdminDashboard from "../Layout/AdminDashboard";
import Course from "../Page/Backend/Admin/Course/Course";
import Admin from "../Page/Backend/Admin/Dashboard/Dashboard";
import User from "../Page/Backend/Admin/User/User";

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