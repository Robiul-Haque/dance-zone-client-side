import { createBrowserRouter } from "react-router-dom";
import Error from "../Page/Error/Error";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Main from "../layout/Main";
import Home from "../page/Frontend/Home/Home";
import Instructor from "../Page/Frontend/Instructor/Instructor";
import AllCourse from "../Page/Frontend/Course/Course";
import StudentPrivetRoute from "./InstructorPrivetRoute";
import StudentDashboard from "../Layout/StudentDashboard";
import StudentDashboard1 from "../Page/Frontend/StudentDashboard/Dashboard";
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
import Checkout from "../Page/Frontend/Checkout/Checkout";
import InstructorSeeCourse from "../Page/Frontend/Instructor/InstructorSeeCourse";
import ContactUs from "../Page/Frontend/ContactUs/ContactUs";
import ContactUsDashboard from "../Page/Backend/Admin/ContactUs/ContactUsDashboard";
import AdminPaymentHistory from "../Page/Backend/Admin/AdminPaymentHistory/AdminPaymentHistory";
import CourseEnrollCheckout from "../Page/Frontend/Checkout/CourseEnrollCheckout/CourseEnrollCheckout";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/course',
                element: <AllCourse></AllCourse>,
                loader: () => fetch('http://localhost:5000/all-course'),
            },
            {
                path: '/instructor',
                element: <Instructor></Instructor>,
            },
            {
                path: '/instructor/see-all-course/:email',
                element: <InstructorSeeCourse></InstructorSeeCourse>,
                loader: ({ params }) => fetch(`http://localhost:5000/see-all-course-by-instructor/${params.email}`)
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/student/dashboard',
                element: <StudentPrivetRoute><StudentDashboard></StudentDashboard></StudentPrivetRoute>,
                children: [
                    {
                        path: '/student/dashboard',
                        element: <StudentDashboard1></StudentDashboard1>,
                    },
                    {
                        path: '/student/dashboard/selected-course',
                        element: <SelectedCourse></SelectedCourse>
                    },
                    {
                        path: '/student/dashboard/enrolled-course',
                        element: <EnrolledCourse></EnrolledCourse>,
                    },
                    {
                        path: '/student/dashboard/payment-history',
                        element: <PaymentHistory></PaymentHistory>,
                    },
                    {
                        path: '/student/dashboard/checkout/:id',
                        element: <Checkout></Checkout>,
                        loader: ({ params }) => fetch(`http://localhost:5000/student/selected-single-course/${params.id}`)
                    },
                    // single course direct enroll now stripe payment
                    {
                        path: '/student/dashboard/course/enroll/checkout/:id',
                        element: <CourseEnrollCheckout></CourseEnrollCheckout>,
                        loader: ({ params }) => fetch(`http://localhost:5000/student/course/enroll/checkout/${params.id}`)
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
                path: '',
                element: <Admin></Admin>
            },
            {
                path: '/admin-dashboard/manage-user',
                element: <User></User>
            },
            {
                path: '/admin-dashboard/manage-course',
                element: <Course></Course>
            },
            {
                path: '/admin-dashboard/payment-history',
                element: <AdminPaymentHistory></AdminPaymentHistory>
            },
            {
                path: '/admin-dashboard/contact-us/message',
                element: <ContactUsDashboard></ContactUsDashboard>
            }
        ]
    }
])