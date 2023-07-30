import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
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
                        <Link to='/admin/dashboard'><img width="24" height="24" src="https://img.icons8.com/material/24/1A1A1A/dashboard-layout.png" alt="dashboard-layout"/> Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/admin/dashboard/user'><img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/group.png" alt="group" /> Manage User</Link>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;