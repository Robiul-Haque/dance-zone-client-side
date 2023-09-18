import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { Link } from "react-router-dom";
import Title from "../../../../../PageTitle/Title";

const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const [approveCourseLimit, setApproveCourseLimit] = useState([]);
    const [approveCourse, setApproveCourse] = useState([]);
    const [pendingCourse, setPendingCourse] = useState([]);
    const [rejectedCourse, setRejectedCourse] = useState([]);
    const [instructorTotalRevenue, setInstructorTotalRevenue] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/total-approve/course/${user?.email}`)
            .then(res => res.json())
            .then(data => setApproveCourseLimit(data))

        fetch(`http://localhost:5000/total-approve/course/${user?.email}`)
            .then(res => res.json())
            .then(data => setApproveCourse(data))

        fetch(`http://localhost:5000/total-pending/course/${user?.email}`)
            .then(res => res.json())
            .then(data => setPendingCourse(data))

        fetch(`http://localhost:5000/total-rejected/course/${user?.email}`)
            .then(res => res.json())
            .then(data => setRejectedCourse(data))

        fetch(`http://localhost:5000/total-revenue-by-instructor/${user?.email}`)
            .then(res => res.json())
            .then(data => setInstructorTotalRevenue(data))
    }, [user?.email]);

    return (
        <>
            <Title title={'Instructor Dashboard'}></Title>
            <div className="flex lg:gap-10 flex-wrap">
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Course Status</h2>
                        <h2 className="text-xl">Approve Course: {approveCourse?.length}</h2>
                        <h2 className="text-xl">Pending Course: {pendingCourse?.length}</h2>
                        <h2 className="text-xl">Rejected Course: {rejectedCourse?.length}</h2>
                    </div>
                </div>
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Total Revenue</h2>
                        <h2 className="text-xl">{
                            instructorTotalRevenue?.reduce((previewValue, currentValue) => {
                                return previewValue + currentValue?.course_price;
                            }, 0)
                        } $</h2>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto border rounded-xl py-5 hover:shadow-xl transition duration-1000 ease-out mt-10">
                <h1 className="text-center text-xl font-bold mb-5">Approve Course</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Image</th>
                            <th>Course Name</th>
                            <th>Course Price</th>
                            <th>Available Seats</th>
                            <th>Course Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            approveCourseLimit.map((course, index) => {
                                return (
                                    <tr key={course?._id}>
                                        <th>{index + 1}</th>
                                        <td><img src={course?.class_image} alt={course?.class_name} className="w-16 h-16 rounded-xl" /></td>
                                        <td>{course?.class_name}</td>
                                        <td>{course?.course_price}</td>
                                        <td>{course?.available_seats}</td>
                                        <td>{course?.course_price} $</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="text-center mt-5"><Link to={'/instructor-dashboard/my-course'} className="btn">See More</Link></div>
            </div>
        </>
    );
};

export default Dashboard;