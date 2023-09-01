import { useEffect, useState } from "react";

const Dashboard = () => {

    const [adminDashboardStatices, setAdminDashboardStatices] = useState({});
    const { admin, instructor, student, pending, accepted, rejected, contactUnseenMessage, enrolledCourse } = adminDashboardStatices || {};
    const [totalEnrolledCoursePrice, setTotalEnrolledCoursePrice] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/admin-dashboard/statices')
            .then(res => res.json())
            .then(data => setAdminDashboardStatices(data))

        fetch('http://localhost:5000/admin-dashboard/statices/total-revenue')
            .then(res => res.json())
            .then(data => setTotalEnrolledCoursePrice(data))
    }, [])

    return (
        <>
            <div className="flex lg:gap-10 md:gap-6 gap-4 flex-wrap">
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">User Status</h2>
                        <h2 className="text-xl">Admin: {admin}</h2>
                        <h2 className="text-xl">Instructor: {instructor}</h2>
                        <h2 className="text-xl">Student: {student}</h2>
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Course Status</h2>
                        <h2 className="text-xl">Pending: {pending}</h2>
                        <h2 className="text-xl">Approve: {accepted}</h2>
                        <h2 className="text-xl">Deny: {rejected}</h2>
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Contact Message</h2>
                        <h2 className="text-xl">New Message: {contactUnseenMessage}</h2>
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Enrolled Course</h2>
                        <h2 className="text-xl">Total Enrolled: {enrolledCourse}</h2>
                    </div>
                </div>
                <div className="bg-base-200 lg:w-64 md:w-72 w-56 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Total Revenue</h2>
                        <h2 className="text-xl">10000 $</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;