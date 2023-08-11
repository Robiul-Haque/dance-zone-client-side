import { Link } from "react-router-dom";
import useInstructorMyCourse from "../../../../Hook/useInstructorMyCourse";

const MyClass = () => {

    const { data, isLoading } = useInstructorMyCourse();

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Course Image</th>
                        <th>Course Name</th>
                        <th>Status</th>
                        <th>Enrolled Student</th>
                        <th>Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((singleCourse, index) =>
                            <tr key={singleCourse?._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img src={singleCourse?.class_image} alt={singleCourse?.class_name + 'Course photo'} className="w-16 h-16 rounded-xl" />
                                </td>
                                <td>{singleCourse?.class_name}</td>
                                <td className={singleCourse?.status === 'pending' ? 'capitalize font-semibold' : singleCourse?.status === 'accepted' ? 'text-green-600 capitalize font-semibold' : singleCourse?.status === 'rejected' ? 'text-red-600 capitalize font-semibold' : ''}>{singleCourse?.status}</td>
                                <td></td>
                                <td className="w-64 overflow-auto">{singleCourse?.feedback}</td>
                                <td>
                                    <Link to={`/instructor-dashboard/my-course/edit/${singleCourse?._id}`} className="btn"><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" /> Edit</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyClass;