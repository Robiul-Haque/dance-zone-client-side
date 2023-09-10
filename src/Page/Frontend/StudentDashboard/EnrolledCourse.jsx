import { useLoaderData } from "react-router-dom";
import Title from "../../../../PageTitle/Title";

const EnrolledCourse = () => {

    const enrolledCourses = useLoaderData();

    return (
        <>
            <Title title={'Enrolled Course'}></Title>
            <div className="overflow-x-auto">
                <table className="table">
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