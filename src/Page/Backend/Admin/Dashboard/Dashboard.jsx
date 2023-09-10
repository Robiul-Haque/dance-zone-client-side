import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../../../PageTitle/Title";

const Dashboard = () => {

    const [adminDashboardStatices, setAdminDashboardStatices] = useState({});
    const { admin, instructor, student, pending, accepted, rejected, contactUnseenMessage, enrolledCourse } = adminDashboardStatices || {};
    // const [totalEnrolledCoursePrice, setTotalEnrolledCoursePrice] = useState([]);
    const [users, setUsers] = useState([]);
    const [approveCourses, setApproveCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/admin-dashboard/statices')
            .then(res => res.json())
            .then(data => setAdminDashboardStatices(data))

        // fetch('http://localhost:5000/admin-dashboard/statices/total-revenue')
        //     .then(res => res.json())
        //     .then(data => setTotalEnrolledCoursePrice(data))

        fetch('http://localhost:5000/admin-dashboard/statices/user')
            .then(res => res.json())
            .then(data => setUsers(data))

        fetch('http://localhost:5000/admin-dashboard/statices/approve-course')
            .then(res => res.json())
            .then(data => setApproveCourses(data))
    }, [])

    return (
        <>
            <Title title={'Admin Dashboard'}></Title>
            <div className="flex lg:gap-10 md:gap-6 gap-4 flex-wrap">
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">User Status</h2>
                        {
                            admin || instructor || student ?
                                <>
                                    <h2 className="text-xl">Admin: {admin}</h2>
                                    <h2 className="text-xl">Instructor: {instructor}</h2>
                                    <h2 className="text-xl">Student: {student}</h2>
                                </>

                                :
                                <span className="loading loading-dots loading-lg"></span>
                        }
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Course Status</h2>
                        {
                            pending || accepted || rejected ?
                                <>
                                    <h2 className="text-xl">Pending: {pending}</h2>
                                    <h2 className="text-xl">Approve: {accepted}</h2>
                                    <h2 className="text-xl">Deny: {rejected}</h2>
                                </>
                                :
                                <span className="loading loading-dots loading-lg"></span>
                        }
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Contact Message</h2>
                        {
                            contactUnseenMessage ?
                                <h2 className="text-xl">New Message: {contactUnseenMessage}</h2>
                                :
                                <span className="loading loading-dots loading-lg"></span>
                        }
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Enrolled Course</h2>
                        {
                            enrolledCourse ?
                                <h2 className="text-xl">Total Enrolled: {enrolledCourse}</h2>
                                :
                                <span className="loading loading-dots loading-lg"></span>
                        }
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Total Revenue</h2>
                        <h2 className="text-xl">10000 $</h2>
                    </div>
                </div>
            </div>
            <div className="flex lg:gap-20 md:gap-10 gap-y-5 flex-wrap justify-center mt-14">
                <div className="overflow-x-auto border rounded-xl p-5 hover:shadow-xl transition duration-1000 ease-out">
                    <h2 className="text-center text-xl font-bold mb-5">Register User</h2>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => {
                                    return (
                                        <tr key={user?._id}>
                                            <th>{index + 1}</th>
                                            <td><img src={user?.photo} alt={user?.user_name} className="w-16 h-16 rounded-xl" /></td>
                                            <td>{user?.name}</td>
                                            <td>{user?.email}</td>
                                            <td className="capitalize">{user?.role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="text-center mt-5"><Link to={'/admin-dashboard/manage-user'} className="btn">See More</Link></div>
                </div>
                <div className="overflow-x-auto border rounded-xl p-5 hover:shadow-xl transition duration-500 ease-out">
                    <h2 className="text-center text-xl font-bold mb-5">Approve Course</h2>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course Image</th>
                                <th>Course Name</th>
                                <th>Price</th>
                                <th>Available seat</th>
                                <th>Instructor Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                approveCourses?.map((course, index) => {
                                    return (
                                        <tr key={course?._id}>
                                            <th>{index + 1}</th>
                                            <td><img src={course?.class_image} alt={course?.class_name} className="w-16 h-16 rounded-xl" /></td>
                                            <td>{course?.class_name}</td>
                                            <td>{course?.course_price}</td>
                                            <td>{course?.available_seats}</td>
                                            <td>{course?.instructor_name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="text-center mt-5"><Link to={'/admin-dashboard/manage-course'} className="btn">See More</Link></div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;