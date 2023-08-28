import { NavLink, Outlet } from "react-router-dom";

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
                        <NavLink to='/student/dashboard/selected-course'><img width="25" height="25" src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/external-selected-business-inkubators-glyph-inkubators.png" alt="external-selected-business-inkubators-glyph-inkubators" /> Selected Course</NavLink>
                    </li>
                    <li className="my-2">
                        <NavLink to='/student/dashboard/enrolled-course'><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/knowledge-sharing.png" alt="knowledge-sharing" /> Enrolled Course</NavLink>
                    </li>
                    <li>
                        <NavLink to='/student/dashboard/payment-history'><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/payment-history.png" alt="payment-history" /> Payment History</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;