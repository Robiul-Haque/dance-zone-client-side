import { useLoaderData } from "react-router-dom";

const Class = () => {

    const allClasses = useLoaderData();

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
                    </tr>
                </thead>
                <tbody>
                    {
                        allClasses.map((data, index) =>
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={data.class_image} alt={data.class_image} className="w-16 h-16 rounded-xl" />
                                </td>
                                <td>{data.class_name}</td>
                                <td>{data.instructor_name}</td>
                                <td>{data.instructor_email}</td>
                                <td></td>
                                <td>{data.course_price}</td>
                                <td>{data.status}</td>
                                <td>
                                    <button className="btn bg-green-400 hover:bg-green-500">Approve</button>
                                </td>
                                <td>
                                    <button className="btn bg-red-400 hover:bg-red-500">Deny</button>
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