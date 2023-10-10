import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Lottie from "lottie-react";
import offline from '../assets/Lost-connation.json';
import { Offline, Online } from "react-detect-offline";

const Dashboard = () => {

    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [verifyStudent, setVerifyStudent] = useState({});
    

    useEffect(() => {
        fetch(`http://localhost:5000/if-exist-student/${user?.email}`)
            .then(res => res.json())
            .then(data => setVerifyStudent(data))
    }, [user, navigate, userLogout])

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mt-5 lg:hidden">Open drawer</label>
                <div className="my-10">
                    {
                        verifyStudent?.role === "student" && <Online><Outlet></Outlet></Online>
                    }
                    <Offline>
                        <div className="h-screen">
                            <Lottie className="w-full h-5/6" animationData={offline} loop={true}></Lottie>
                            <h2 className="text-center text-stone-600 font-bold text-3xl">You Are Offline...</h2>
                        </div>
                    </Offline>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 lg:w-80 md:w-64 w-60 h-full bg-base-200 text-base-content z-50">
                    {/* Sidebar content here */}
                    {
                        verifyStudent?.role === "student" && <>
                            <li>
                                <NavLink to='/student/dashboard/selected-course'><img width="25" height="25" src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/external-selected-business-inkubators-glyph-inkubators.png" alt="external-selected-business-inkubators-glyph-inkubators" /> Selected Course</NavLink>
                            </li>
                            <li className="my-2">
                                <NavLink to='/student/dashboard/enrolled-course'><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/knowledge-sharing.png" alt="knowledge-sharing" /> Enrolled Course</NavLink>
                            </li>
                            <li>
                                <NavLink to='/student/dashboard/payment-history'><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/payment-history.png" alt="payment-history" /> Payment History</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;