import Title from "../../../../PageTitle/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const EnrolledCourse = () => {

    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/student/enrolled-course/${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.error) {
                    userLogout()
                        .then()
                    navigate('/login');
                } else {
                    setEnrolledCourses(data);
                }
            })
    }, [user?.email, navigate, userLogout]);

    return (
        <>
            <Title title={'Enrolled Course'}></Title>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Course Price</th>
                            <th>Instructor Name</th>
                            <th>Enrolled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enrolledCourses.map((course, index) => {
                                return (
                                    <tr key={course?._id}>
                                        <th>{index + 1}</th>
                                        <td><img src={course?.class_image} alt={course?.class_name} className="w-16 h-16 rounded-xl" /></td>
                                        <td>{course?.class_name}</td>
                                        <td>{course?.course_price} $</td>
                                        <td>{course?.instructor_name}</td>
                                        <td>{course?.date}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EnrolledCourse;