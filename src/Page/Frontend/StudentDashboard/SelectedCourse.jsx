import { toast } from "react-toastify";
import useStudentSelectedCourse from "../../../Hook/useStudentSelectedCourse";
import { Link } from "react-router-dom";
import Title from "../../../../PageTitle/Title";

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
                        toast.success('Course Delete Successfully', {
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
        <>
            <Title title={'Selected Course'}></Title>
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
                            data.map((course, index) => {
                                return (
                                    <tr key={course?._id}>
                                        <th>{index + 1}</th>
                                        <td><img src={course?.class_image} alt={course?.class_name + 'Class photo'} className="w-16 h-16 rounded-xl" /></td>
                                        <td>{course?.class_name}</td>
                                        <td>{course?.course_price} $</td>
                                        <td>{course?.instructor_name}</td>
                                        <td><Link to={`/student/dashboard/checkout/${course?._id}`} className="btn btn-neutral">Enroll Now</Link></td>
                                        <td><button onClick={() => deleteCourse(course?._id)} className="btn bg-red-500 text-white hover:bg-red-600">Delete</button></td>
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

export default SelectedCourse;