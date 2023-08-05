import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {

    const { user, userLogout } = useContext(AuthContext);

    const logOut = () => {
        userLogout()
            .then(() => {
                console.log('User log out');
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
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to='/' className='font-medium text-base block text-center'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/instructor' className='font-medium text-base block text-center'>Instructor</NavLink>
                        </li>
                        <li>
                            <NavLink to='/class' className='font-medium text-base block text-center'>Class</NavLink>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">
                    <h1 className="font-weight-500">Dance Zone</h1>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to='/' className='font-medium text-base'>Home</NavLink>
                    </li>
                    <li className="mx-4">
                        <NavLink to='/instructor' className='font-medium text-base'>Instructor</NavLink>
                    </li>
                    <li>
                        <NavLink to='/class' className='font-medium text-base'>Class</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end flex justify-end gap-4">
                {
                    user?.email ?
                        <>
                            <NavLink to='/student/dashboard' className='btn'>Dashboard</NavLink>
                            <div className="avatar mx-1">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName} />
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
        </div>
    );
};

export default Navbar;