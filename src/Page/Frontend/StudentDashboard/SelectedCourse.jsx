import { toast } from "react-toastify";
import useStudentSelectedCourse from "../../../Hook/useStudentSelectedCourse";

const SelectedCourse = () => {

    const { data, refetch, isLoading } = useStudentSelectedCourse();

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    const deleteCourse = id => {
        const confirmation = confirm('Are you sure want to do Delete');
        if (confirmation) {
            fetch(`http://localhost:5000/student/delete-selected-course/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    if (data?.deletedCount) {
                        toast.success('Course Delete Successful', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                })
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Course Image</th>
                        <th>Course Name</th>
                        <th>Course Price</th>
                        <th>Instructor Name</th>
                        <th>Enroll</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((allCourse, index) => {
                            return (
                                <tr key={allCourse?._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={allCourse?.class_image} alt={allCourse?.class_name + 'Class photo'} className="w-16 h-16 rounded-xl" /></td>
                                    <td>{allCourse?.class_name}</td>
                                    <td>{allCourse?.course_price}</td>
                                    <td>{allCourse?.instructor_name}</td>
                                    <td><button className="btn btn-outline btn-neutral">Enroll Now</button></td>
                                    <td><button onClick={() => deleteCourse(allCourse?._id)} className="btn btn-outline  hover:bg-red-600 border-1 border-red-600">Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SelectedCourse;