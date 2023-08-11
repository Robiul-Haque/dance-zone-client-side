import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

const Instructor = () => {

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
                        <Link to='/instructor-dashboard'><img width="24" height="24" src="https://img.icons8.com/material/24/1A1A1A/dashboard-layout.png" alt="dashboard-layout" /> Dashboard</Link>
                    </li>
                    <li className="my-2">
                        <Link to='/instructor-dashboard/add-course'><img width="24" height="24" src="https://img.icons8.com/ios-filled/50/classroom.png" alt="classroom" /> Add A Course</Link>
                    </li>
                    <li>
                        <Link to='/instructor-dashboard/my-course'><img width="24" height="24" src="https://img.icons8.com/fluency-systems-filled/48/class.png" alt="class" /> My Course</Link>
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

export default Instructor;