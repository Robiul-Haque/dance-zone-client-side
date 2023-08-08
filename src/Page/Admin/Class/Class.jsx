import useAdminManageClass from "../../../Hook/useAdminManageClass";
import { useState } from "react";
import AdminFeedbackModal from "./AdminFeedbackModal";
import { toast } from "react-toastify";

const Class = () => {

    const [classId, setClassId] = useState('');
    const { data, isLoading, refetch } = useAdminManageClass();
    const [previousFeedback, setPreviousFeedback] = useState('');

    const approve = id => {
        fetch(`http://localhost:5000/admin/approve-class/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const deny = id => {
        fetch(`http://localhost:5000/admin/deny-class/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const modalData = (id) => {
        fetch(`http://localhost:5000/admin/feedback/data/${id}`)
            .then(res => res.json())
            .then(data => setPreviousFeedback(data?.feedback))
    }

    const deleteClass = id => {
        const confirmation = confirm('Are you sure want to do Delete');
        if (confirmation === true) {
            fetch(`http://localhost:5000/admin/delete-class/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    refetch();
                    if (data?.deletedCount > 0) {
                        toast.success('Class Delete Successful', {
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
        <div className="overflow-x-auto">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Available seat</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Approve</th>
                        <th>Deny</th>
                        <th>Feedback</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((data, index) =>
                            <tr key={data?._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={data?.class_image} alt={data?.class_image} className="w-16 h-16 rounded-xl" />
                                </td>
                                <td>{data?.class_name}</td>
                                <td>{data?.instructor_name}</td>
                                <td>{data?.instructor_email}</td>
                                <td></td>
                                <td>{data?.course_price}</td>
                                <td className={data?.status === 'accepted' ? 'text-green-500 capitalize font-semibold' : data?.status === 'rejected' ? 'text-red-500 capitalize font-semibold' : 'capitalize font-semibold'}>{data?.status}</td>
                                <td>
                                    <button onClick={() => approve(data?._id)} className={data?.status === 'accepted' || data?.status === 'rejected' ? 'btn btn-disabled' : 'btn bg-green-400 hover:bg-green-500'}>Approve</button>
                                </td>
                                <td>
                                    <button onClick={() => deny(data?._id)} className={data?.status === 'accepted' || data?.status === 'rejected' ? 'btn btn-disabled' : 'btn bg-red-400 hover:bg-red-500'}>Deny</button>
                                </td>
                                <td>
                                    <button className="btn" onClick={() => { window.my_modal_3.showModal(data?._id); setClassId(data?._id); modalData(data?._id) }}>Feedback</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteClass(data?._id)} className="btn bg-red-500 text-white hover:bg-red-500">Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <AdminFeedbackModal id={classId} oldFeedback={previousFeedback}></AdminFeedbackModal>
        </div>
    );
};

export default Class;