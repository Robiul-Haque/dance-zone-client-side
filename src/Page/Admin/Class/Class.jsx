import useAdminManageClass from "../../../Hook/useAdminManageClass";

const Class = () => {

    const { data, isLoading, refetch } = useAdminManageClass();

    const approve = id => {
        fetch(`http://localhost:5000/admin/approve-class/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const deny = id => {
        fetch(`http://localhost:5000/admin/deny-class/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <div className="overflow-x-auto mx-4">
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
                                    <button className="btn">Feedback</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Class;