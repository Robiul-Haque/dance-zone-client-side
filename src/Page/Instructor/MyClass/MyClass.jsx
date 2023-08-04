import { Link, useLoaderData } from "react-router-dom";

const MyClass = () => {

    const allClass = useLoaderData();

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
                        allClass.map((data, index) =>
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={data.class_image} alt={data.class_name} className="w-16 h-16 rounded-xl" />
                                </td>
                                <td>{data.class_name}</td>
                                <td className={data.status === 'pending' ? 'text-yellow-600 capitalize font-semibold' : data.status === 'approve' ? 'text-green-600 capitalize font-semibold' : data.status === 'reject' ? 'text-red-600 capitalize font-semibold' : ''}>{data.status}</td>
                                <td></td>
                                <td className="w-64 overflow-auto">Quality Control Specialist Quality Control Specialist</td>
                                <td>
                                    <Link className="btn"><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" /> edit</Link>
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