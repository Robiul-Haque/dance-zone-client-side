import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div className="my-10">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        <Link to='/student/dashboard/selected-course'>Selected Course</Link>
                    </li>
                    <li className="my-2">
                        <Link to='/student/dashboard/enrolled-course'>Enrolled Course</Link>
                    </li>
                    <li>
                        <Link to='/student/dashboard/payment-history'>Payment History</Link>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;