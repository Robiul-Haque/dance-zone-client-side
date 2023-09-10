import { useLoaderData } from "react-router-dom";
import Title from "../../../../PageTitle/Title";

const PaymentHistory = () => {

    const PaymentHistory = useLoaderData();

    return (
        <>
            <Title title={'Payment History'}></Title>
            <div className="overflow-x-auto">
                <table className="table">
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
                            PaymentHistory.map((data, index) => {
                                return (
                                    <tr key={data?._id}>
                                        <th>{index + 1}</th>
                                        <td>{data?.transaction_id}</td>
                                        <td>{data?.class_name}</td>
                                        <td>{data?.course_price}</td>
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