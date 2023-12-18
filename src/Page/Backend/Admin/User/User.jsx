import { toast } from "react-toastify";
import Title from "../../../../../PageTitle/Title";
import useAdminManageUser from "../../../../Hook/useAdminManageUser";
import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const User = () => {

    const { refetch, isLoading, data } = useAdminManageUser();
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (data?.error) {
        userLogout()
            .then()
        navigate('/login');
    }

    const makeAdmin = id => {
        fetch(`http://localhost:5000/manage-user/update-role-admin/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const makeInstructor = id => {
        fetch(`http://localhost:5000/admin/manage-user/update/view-status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())

        fetch(`http://localhost:5000/manage-user/update-role-instructor/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    const deleteUser = id => {
        const confirmation = confirm('Are you sure want to do Delete!');

        if (confirmation) {
            fetch(`http://localhost:5000/user/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    refetch()

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
            <Title title={'Manage User'}></Title>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Image</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Instructor</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="font-medium">
                        {
                            data.map((user, index) =>
                                <tr key={user?._id} className={user?.status === 'unseen' ? 'bg-base-200' : ''}>
                                    <th>{index + 1}</th>
                                    <td><img src={user?.photo} alt={user?.user_name} className="w-16 h-16 rounded-xl" /></td>
                                    <td>{user?.email}</td>
                                    <td className={user?.role === 'admin' ? "text-green-500 capitalize" : user.role === 'instructor' ? "text-red-500 capitalize" : "text-purple-500 capitalize"}>{user?.role}</td>
                                    <td>
                                        <button onClick={() => makeAdmin(user?._id)} type="button" className={user?.role === 'admin' ? "btn btn-disabled" : "btn bg-green-500 text-white hover:bg-green-600"}>
                                            <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/administrator-male.png" alt="administrator-male" />
                                            admin
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => makeInstructor(user?._id)} type="button" className={user?.role === 'instructor' ? "btn btn-disabled" : "btn bg-red-500 text-white hover:bg-red-600"}>
                                            <img width="26" height="26" src="https://img.icons8.com/ios-filled/50/coach-.png" alt="coach-" />
                                            instructor
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(user?._id)} className="btn bg-red-500 hover:bg-red-600 text-white" type="button">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default User;