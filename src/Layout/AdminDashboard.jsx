import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

const Dashboard = () => {

    const { userLogout } = useContext(AuthContext);

    const logOut = () => {
        userLogout()
            .then(() => {
                console.log('User log out');
                toast.success('Log Out Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
    }

    return (
        <div className="drawer lg:drawer-open md:px-60">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        <Link to='/admin-dashboard'><img width="24" height="24" src="https://img.icons8.com/material/24/1A1A1A/dashboard-layout.png" alt="dashboard-layout" /> Dashboard</Link>
                    </li>
                    <li className="my-2">
                        <Link to='/admin-dashboard/user'><img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/group.png" alt="user" /> Manage User</Link>
                    </li>
                    <li>
                        <Link to='/admin-dashboard/manage-class'><img width="25" height="25" src="https://img.icons8.com/metro/26/class.png" alt="class"/> Manage Class</Link>
                    </li>
                    <hr className="my-2" />
                    <li>
                        <button onClick={logOut}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/exit.png" alt="exit" /> Logout</button>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;