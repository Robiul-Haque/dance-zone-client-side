import { Link } from "react-router-dom";
import useInstructorMyClass from "../../../Hook/useInstructorMyClass";

const MyClass = () => {

    const { data, isLoading } = useInstructorMyClass();


    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Status</th>
                        <th>Enrolled Student</th>
                        <th>Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((singleClass, index) =>
                            <tr key={singleClass?._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={singleClass?.class_image} alt={singleClass?.class_name} className="w-16 h-16 rounded-xl" />
                                </td>
                                <td>{singleClass?.class_name}</td>
                                <td className={singleClass?.status === 'pending' ? 'capitalize font-semibold' : singleClass?.status === 'accepted' ? 'text-green-600 capitalize font-semibold' : singleClass?.status === 'rejected' ? 'text-red-600 capitalize font-semibold' : ''}>{singleClass?.status}</td>
                                <td></td>
                                <td className="w-64 overflow-auto">{singleClass?.feedback}</td>
                                <td>
                                    <Link to={`/instructor-dashboard/my-class/edit/${singleClass?._id}`} className="btn"><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" /> Edit</Link>
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