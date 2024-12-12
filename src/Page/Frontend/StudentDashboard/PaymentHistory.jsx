import Title from "../../../../PageTitle/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {

    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        fetch(`https://dance-zone-server.vercel.app/student/payment-history/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.error) {
                    userLogout()
                        .then()
                    navigate('/login');
                } else {
                    setPaymentHistory(data);
                }
            })
    }, [user?.email, navigate, userLogout])

    return (
        <>
            <Title title={'Payment History'}></Title>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction Id</th>
                            <th>Class Name</th>
                            <th>Course Price</th>
                            <th>Instructor Name</th>
                            <th>Enrolled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentHistory.map((data, index) => {
                                return (
                                    <tr key={data?._id}>
                                        <th>{index + 1}</th>
                                        <td>{data?.transaction_id}</td>
                                        <td>{data?.class_name}</td>
                                        <td>{data?.course_price} $</td>
                                        <td>{data?.instructor_name}</td>
                                        <td>{data?.date}</td>
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

export default PaymentHistory;