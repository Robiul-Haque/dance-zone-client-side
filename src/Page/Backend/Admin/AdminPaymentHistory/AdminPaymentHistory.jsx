import { toast } from 'react-toastify';
import useAdminPaymentHistory from '../../../../Hook/useAdminPaymentHistory';

const AdminPaymentHistory = () => {

    const { data, isLoading, refetch } = useAdminPaymentHistory();

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    const deletePaymentHistory = id => {
        const confirmation = confirm('Are you sure want to do Delete');
        if (confirmation === true) {
            fetch(`http://localhost:5000/admin/delete-payment-history/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    if (data?.deletedCount > 0) {
                        toast.success('Payment History Delete Successfully', {
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
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Course Image</th>
                            <th>Course Name</th>
                            <th>Price</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Stripe Txn Id</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(payment => {
                                return (
                                    <tr key={payment?._id}>
                                        <th>1</th>
                                        <td><img src={payment?.class_image} alt={payment?.class_name} className="w-16 h-16 rounded-xl" /></td>
                                        <td>{payment?.class_name}</td>
                                        <td>{payment?.course_price} $</td>
                                        <td>{payment?.instructor_name}</td>
                                        <td>{payment?.instructor_email}</td>
                                        <td>{payment?.user_name}</td>
                                        <td>{payment?.user_email}</td>
                                        <td>{payment?.transaction_id}</td>
                                        <td><button onClick={() => deletePaymentHistory(payment?._id)} className="btn bg-red-500 hover:bg-red-600 text-white">Delete</button></td>
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

export default AdminPaymentHistory;









