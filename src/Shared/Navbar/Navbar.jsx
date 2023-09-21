import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {

    const { user, userLogout } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    const [verifyStudent, setVerifyStudent] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/if-exist-student/${user?.email}`)
            .then(res => res.json())
            .then(data => setVerifyStudent(data))
    }, [user?.email])

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
                localStorage.removeItem('jwt-access-token')
                toast.success('Log out Successful', {
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
        <div className="navbar bg-base-200 md:px-60">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 z-40">
                        <li>
                            <NavLink to='/' className='font-medium text-base block text-center'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/course' className='font-medium text-base block text-center'>Course</NavLink>
                        </li>
                        <li>
                            <NavLink to='/instructor' className='font-medium text-base block text-center'>Instructor</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact-us' className='font-medium text-base block text-center'>Contact us</NavLink>
                        </li>
                    </ul>
                </div>
                <Link to={'/'} className="font-bold text-2xl font-serif">Dance Zone</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3">
                    <li>
                        <NavLink to='/' className='font-medium text-base'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/course' className='font-medium text-base block text-center'>Course</NavLink>
                    </li>
                    <li>
                        <NavLink to='/instructor' className='font-medium text-base'>Instructor</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact-us' className='font-medium text-base block text-center'>Contact us</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end flex justify-end gap-4">
                {
                    user?.email ?
                        <>
                            {
                                verifyStudent?.role === "student" && <NavLink to='/student/dashboard' className='btn '>Dashboard</NavLink>
                            }
                            <div className="avatar online lg:mx-1">
                                <div className="w-12 rounded-full">
                                    <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName} className="avatar online" />
                                </div>
                            </div>
                            <button onClick={logOut} className="btn">Logout</button>
                        </>
                        :
                        <>
                            <NavLink to='/login' className='btn'>Login</NavLink>
                            <NavLink to='/register' className='btn'>Register</NavLink>
                        </>
                }
            </div>
            <label className="swap swap-rotate lg:ml-9">
                <input type="checkbox" onChange={handelToggle} />
                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>
        </div>
    );
};

export default Navbar;