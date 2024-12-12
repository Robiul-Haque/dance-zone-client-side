import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../../../../PageTitle/Title";
import { AuthContext } from "../../../../Auth/AuthProvider";

const Dashboard = () => {
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [adminDashboardStatices, setAdminDashboardStatices] = useState({});
    const { admin, instructor, student, pending, accepted, rejected, contactUnseenMessage, enrolledCourse } = adminDashboardStatices || {};
    const [totalEnrolledCoursePrice, setTotalEnrolledCoursePrice] = useState([]);
    const [users, setUsers] = useState([]);
    const [approveCourses, setApproveCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch('https://dance-zone-server.vercel.app/admin-dashboard/statices')
            .then(res => res.json())
            .then(data => {
                setAdminDashboardStatices(data);
            })

        fetch('https://dance-zone-server.vercel.app/admin-dashboard/statices/total-revenue')
            .then(res => res.json())
            .then(data => {
                setTotalEnrolledCoursePrice(data);
            })

        fetch('https://dance-zone-server.vercel.app/admin-dashboard/statices/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })

        fetch('https://dance-zone-server.vercel.app/admin-dashboard/statices/approve-course')
            .then(res => res.json())
            .then(data => {
                setApproveCourses(data)
                setLoading(false)
            })
    }, [navigate, userLogout])

    return (
        <>
            <Title title={'Admin Dashboard'}></Title>
            <div className="flex justify-center flex-wrap gap-4 lg:gap-10 md:gap-6">
                <div className="flex items-center justify-center w-56 h-40 text-gray-500 border rounded-lg bg-base-200 lg:w-64 md:w-72">
                    <div className="text-2xl font-medium text-center">
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
                <div className="flex items-center justify-center w-56 h-40 text-gray-500 border rounded-lg bg-base-200 lg:w-64 md:w-72">
                    <div className="text-2xl font-medium text-center">
                        <h2 className="mb-3">Course Status</h2>
                        {
                            loading === true ? <span className="loading loading-dots loading-lg"></span>
                                :
                                pending || accepted || rejected ?
                                    <>
                                        <h2 className="text-xl">Pending: {pending}</h2>
                                        <h2 className="text-xl">Approve: {accepted}</h2>
                                        <h2 className="text-xl">Deny: {rejected}</h2>
                                    </>
                                    :
                                    <p className='text-sm'>No Data Found</p>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-center w-56 h-40 text-gray-500 border rounded-lg bg-base-200 lg:w-64 md:w-72 indicator">
                    <div className="text-2xl font-medium text-center">
                        <h2 className="mb-3">Contact Message</h2>
                        {
                            loading === true ? <span className="loading loading-dots loading-lg"></span>
                                :
                                contactUnseenMessage ?
                                    <h2 className="text-xl">New Message: {contactUnseenMessage}</h2>
                                    :
                                    <p className='text-sm'>No Data Found</p>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-center w-56 h-40 text-gray-500 border rounded-lg bg-base-200 lg:w-64 md:w-72 indicator">
                    <div className="text-2xl font-medium text-center">
                        <h2 className="mb-3">Enrolled Course</h2>
                        {
                            loading === true ? <span className="loading loading-dots loading-lg"></span>
                                :
                                enrolledCourse ?
                                    <h2 className="text-xl">Total Enrolled: {enrolledCourse}</h2>
                                    :
                                    <p className='text-sm'>No Data Found</p>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-center w-56 h-40 text-gray-500 border rounded-lg bg-base-200 lg:w-64 md:w-72 indicator">
                    <div className="text-2xl font-medium text-center">
                        <h2 className="mb-3">Total Revenue</h2>
                        <h2 className="text-xl">{
                            totalEnrolledCoursePrice.reduce((previousValue, currentValue) => {
                                return previousValue + currentValue.course_price
                            }, 0)
                        } $</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center lg:gap-20 md:gap-10 gap-y-5 mt-14">
                <div className="p-5 overflow-x-auto transition duration-1000 ease-out border rounded-xl hover:shadow-xl">
                    <h2 className="mb-5 text-xl font-bold text-center">Register User</h2>
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
                                            <td className="font-semibold capitalize">{user?.role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="mt-5 text-center"><Link to={'/admin-dashboard/manage-user'} className={users.length === 0 ? "btn btn-disabled" : "btn"}>See More</Link></div>
                </div>
                <div className="p-5 overflow-x-auto transition duration-500 ease-out border rounded-xl hover:shadow-xl">
                    <h2 className="mb-5 text-xl font-bold text-center">Approve Course</h2>
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
                    <div className="mt-5 text-center"><Link to={'/admin-dashboard/manage-course'} className={approveCourses.length === 0 ? "btn btn-disabled" : "btn"}>See More</Link></div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;