import useAdminManageUser from "../../../../Hook/useAdminManageUser";

const User = () => {

    const { refetch, isLoading, data } = useAdminManageUser();

    const makeAdmin = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/manage-user/update-role-admin/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data);
            })
    }

    const makeInstructor = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/manage-user/update-role-instructor/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data);
            })
    }

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Instructor</th>
                        </tr>
                    </thead>
                    <tbody className="font-medium">
                        {
                            data.map((user, index) =>
                                <tr key={user?._id}>
                                    <th>{index + 1}</th>
                                    <td>{user?.email}</td>
                                    <td className={user?.role === 'admin' ? "text-green-500 capitalize" : user.role === 'instructor' ? "text-red-500 capitalize" : "text-purple-500 capitalize"}>{user?.role}</td>
                                    <td>
                                        <button onClick={() => makeAdmin(user?._id)} type="button" className={user?.role === 'admin' ? "btn btn-disabled" : "btn bg-green-400 hover:bg-green-500"}>
                                            <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/administrator-male.png" alt="administrator-male" />
                                            admin
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => makeInstructor(user?._id)} type="button" className={user?.role === 'instructor' ? "btn btn-disabled" : "btn bg-red-400 hover:bg-red-500"}>
                                            <img width="26" height="26" src="https://img.icons8.com/ios-filled/50/coach-.png" alt="coach-" />
                                            instructor
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;