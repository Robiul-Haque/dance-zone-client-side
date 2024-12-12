/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import dance from '../../assets/login.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Title from "../../../PageTitle/Title";

const login = () => {

    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, popUpGoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handelLogin = data => {
        setError('')
        login(data.email, data.password)
            .then(userCredential => {
                if (userCredential.user.email) {
                    fetch(`https://dance-zone-server.vercel.app/login-user/${userCredential.user.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.role === 'student') {
                                navigate(from, { replace: true });

                                if (userCredential.user.email) {
                                    toast.success('Login Successful', {
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
                            }

                            if (data.role === 'instructor') {
                                navigate('/instructor-dashboard');

                                if (userCredential.user.email) {
                                    toast.success('Login Successful', {
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
                            }

                            if (data.role === 'admin') {
                                navigate('/admin-dashboard');

                                if (userCredential.user.email) {
                                    toast.success('Login Successful', {
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
                            }
                        })
                }
            })
            .catch(error => {
                setError(error.message)
            })

    }

    const googleLogin = () => {
        popUpGoogleLogin()
            .then(loggedUser => {
                const loggedUserInfo = { name: loggedUser.user?.displayName, email: loggedUser.user?.email, photo: loggedUser.user?.photoURL, role: 'student' }
                fetch('https://dance-zone-server.vercel.app/login-user', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(loggedUserInfo)
                })
                    .then(res => res.json())
                    .then(() => {
                        fetch(`https://dance-zone-server.vercel.app/check/user-role/${loggedUser?.user?.email}`)
                            .then(res => res.json())
                            .then(data => {

                                if (data.role === 'student') {
                                    navigate('/student/dashboard');

                                    if (loggedUser.user.email) {
                                        toast.success('Login Successful', {
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
                                }

                                if (data.role === 'instructor') {
                                    navigate('/instructor-dashboard');

                                    if (loggedUser.user.email) {
                                        toast.success('Login Successful', {
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
                                }

                                if (data.role === 'admin') {
                                    navigate('/admin-dashboard');

                                    if (loggedUser.user.email) {
                                        toast.success('Login Successful', {
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
                                }
                            })
                    });
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="min-h-screen hero bg-base-200">
            <Title title={'Login'}></Title>
            <div className="flex-col hero-content lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <img src={dance} alt="dance image" />
                </div>
                <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center">Login now!</h1>
                        <form onSubmit={handleSubmit(handelLogin)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", {
                                    required: "Email field is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Email must be valid"
                                    }
                                })} placeholder="email" className={errors.email?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                                {
                                    errors.email?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.email?.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: "Password field is required",
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                                        message: "Password must contain 6 characters, one uppercase, one lowercase, one number, and one special character."
                                    }
                                })} placeholder="password" className={errors.password?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                                {
                                    errors.password?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.password?.message}</p>
                                }
                            </div>
                            <div className="mt-6 form-control">
                                <input type='submit' value='Login' className="text-white btn btn-primary" />
                            </div>
                        </form>
                        <div className="my-2 divider">OR</div>
                        <button onClick={googleLogin} className="btn border-slate-400">
                            <img width="28" height="28" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />
                            <span className="text-slate-600">Login with Google</span>
                        </button>
                        <p className="my-2 text-sm text-center text-slate-500">Don,t have an account <NavLink to='/register' className='font-medium underline text-slate-600'>Register</NavLink></p>
                        {
                            error && <p className="flex mx-auto text-sm text-red-600 gap-x-2"><img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/dc2626/error--v1.png" alt="error--v1" /> {error}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;