import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import { Offline, Online } from "react-detect-offline";
import Lottie from "lottie-react";
import offline from '../assets/Lost-connection.json';

const Instructor = () => {

    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    const [time, setTime] = useState(new Date());
    const [verifyInstructor, setInstructor] = useState({});



    useEffect(() => {
        fetch(`https://dance-zone-server.vercel.app/if-exist-instructor/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setInstructor(data)
            })

        setInterval(() => setTime(new Date()), 1000)
    }, [user, userLogout, navigate]);

    const handelToggle = event => {
        if (event.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localStorageTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localStorageTheme);
    }, [theme])

    const logOut = () => {
        userLogout()
            .then(() => {
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
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="flex flex-col items-center justify-center drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="my-5 btn btn-primary drawer-button lg:hidden">Open Menu</label>
                <div className="my-10">
                    {
                        verifyInstructor?.role === "instructor" && <Online><Outlet></Outlet></Online>
                    }
                    <Offline>
                        <div className="h-screen">
                            <Lottie className="w-full h-5/6" animationData={offline} loop={true}></Lottie>
                            <h2 className="text-3xl font-bold text-center text-stone-600">You Are Offline...</h2>
                        </div>
                    </Offline>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="h-full p-4 menu lg:w-80 md:w-64 w-60 bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <div className="flex lg:gap-x-5 md:gap-x-4 gap-x-2 justify-evenly">
                        <div>
                            {
                                user?.photoURL ? <img src={user?.photoURL} alt={user?.displayName} className="w-12 h-12 rounded-full" /> : ''
                            }
                        </div>
                        <div>
                            <label className="swap swap-rotate">
                                <input type="checkbox" onChange={handelToggle} />
                                <svg className="w-10 h-10 fill-current swap-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                <svg className="w-10 h-10 fill-current swap-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                            </label>
                        </div>
                    </div>
                    <div className="flex mt-6 text-center justify-evenly">
                        <div>
                            {
                                user?.displayName ? <h1 className="text-base font-medium">Hi, <br /> {user?.displayName}</h1> : <>Admin</>
                            }
                        </div>
                        <div>
                            <h2 className="text-xl font-bold"><Link to={'/'}>Dance Zone</Link></h2>
                            <p className="font-semibold">{time.toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <hr className="my-5" />
                    {
                        verifyInstructor?.role === "instructor" && <>
                            <li>
                                <Link to='/instructor-dashboard'><img width="24" height="24" src="https://img.icons8.com/material/24/dashboard-layout.png" alt="dashboard-layout" /> Dashboard</Link>
                            </li>
                            <li className="my-2">
                                <Link to='/instructor-dashboard/add-course'><img width="24" height="24" src="https://img.icons8.com/ios-filled/50/classroom.png" alt="classroom" /> Add A Course</Link>
                            </li>
                            <li>
                                <Link to='/instructor-dashboard/my-course'><img width="24" height="24" src="https://img.icons8.com/fluency-systems-filled/48/class.png" alt="class" /> My Course</Link>
                            </li>
                        </>
                    }
                    <li>
                        <button onClick={logOut}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/exit.png" alt="exit" /> Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Instructor;