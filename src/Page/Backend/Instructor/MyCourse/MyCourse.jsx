import { Link, useNavigate } from "react-router-dom";
import useInstructorMyCourse from "../../../../Hook/useInstructorMyCourse";
import Title from "../../../../../PageTitle/Title";
import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";

const MyClass = () => {

    const { data, isLoading } = useInstructorMyCourse();
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (data?.error) {
        userLogout()
            .then()
        navigate('/login')
    }

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <>
            <Title title={'My Course'}></Title>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Image</th>
                            <th>Course Name</th>
                            <th>Available Seats</th>
                            <th>Course Price</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((course, index) =>
                                <tr key={course?._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={course?.class_image} alt={course?.class_name + 'Course photo'} className="w-16 h-16 rounded-xl" />
                                    </td>
                                    <td>{course?.class_name}</td>
                                    <td>{course?.available_seats}</td>
                                    <td>{course?.course_price} $</td>
                                    <td className={course?.status === 'pending' ? 'capitalize font-semibold' : course?.status === 'accepted' ? 'text-green-600 capitalize font-semibold' : course?.status === 'rejected' ? 'text-red-600 capitalize font-semibold' : ''}>{course?.status}</td>
                                    <td className="w-64 overflow-auto">{course?.feedback}</td>
                                    <td>
                                        <Link to={`/instructor-dashboard/my-course/edit/${course?._id}`} className="btn"><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" /> Edit</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyClass;