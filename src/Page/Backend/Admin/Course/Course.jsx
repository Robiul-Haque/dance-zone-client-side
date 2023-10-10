import useAdminManageCourse from "../../../../Hook/useAdminManageCourse";
import { useContext, useState } from "react";
import AdminFeedbackModal from "./AdminFeedbackModal";
import { toast } from "react-toastify";
import Title from "../../../../../PageTitle/Title";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Course = () => {

    const { data, isLoading, refetch } = useAdminManageCourse();
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState('');
    const [previousFeedback, setPreviousFeedback] = useState('');

    if (data?.error) {
        userLogout()
            .then()
        navigate('/login')
    }

    const approve = id => {
        fetch(`http://localhost:5000/admin/manage-course/update/view-status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())

        fetch(`http://localhost:5000/admin/approve-course/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const deny = id => {
        fetch(`http://localhost:5000/admin/manage-course/update/view-status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())

        fetch(`http://localhost:5000/admin/deny-course/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const modalData = (id) => {
        fetch(`http://localhost:5000/admin/manage-course/update/view-status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())

        fetch(`http://localhost:5000/admin/feedback/data/${id}`, {
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
                    setPreviousFeedback(data?.feedback)
                }
            })
    }

    const deleteCourse = id => {
        const confirmation = confirm('Are you sure want to do Delete!');
        if (confirmation === true) {
            fetch(`http://localhost:5000/admin/delete-course/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(() => {
                    refetch();

                    if (data?.deletedCount > 0) {
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

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <>
            <Title title={'Manage Course'}></Title>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Image</th>
                            <th>Course Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seat</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Admin Send Feedback</th>
                            <th>Approve</th>
                            <th>Deny</th>
                            <th>Feedback</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((course, index) =>
                                <tr key={course?._id} className={course?.view_status === 'unseen' ? 'bg-base-200' : ''}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={course?.class_image} alt={course?.class_image} className="w-16 h-16 rounded-xl" />
                                    </td>
                                    <td>{course?.class_name}</td>
                                    <td>{course?.instructor_name}</td>
                                    <td>{course?.instructor_email}</td>
                                    <td>{course?.available_seats}</td>
                                    <td>{course?.course_price} $</td>
                                    <td className={course?.status === 'accepted' ? 'text-green-500 capitalize font-semibold' : course?.status === 'rejected' ? 'text-red-500 capitalize font-semibold' : 'capitalize font-semibold'}>{course?.status}</td>
                                    <td className="w-64 overflow-auto">{course?.feedback}</td>
                                    <td>
                                        <button onClick={() => approve(course?._id)} className={course?.status === 'accepted' || course?.status === 'rejected' ? 'btn btn-disabled' : 'btn bg-green-500 text-white hover:bg-green-600'}>Approve</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deny(course?._id)} className={course?.status === 'accepted' || course?.status === 'rejected' ? 'btn btn-disabled' : 'btn bg-red-500 text-white hover:bg-red-600'}>Deny</button>
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => { window.my_modal_3.showModal(course?._id); setCourseId(course?._id); modalData(course?._id) }}>Feedback</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteCourse(course?._id)} className="btn bg-red-500 text-white hover:bg-red-500">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <AdminFeedbackModal id={courseId} oldFeedback={previousFeedback} refetch={refetch}></AdminFeedbackModal>
            </div>
        </>
    );
};

export default Course;