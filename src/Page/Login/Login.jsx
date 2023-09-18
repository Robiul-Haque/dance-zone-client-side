/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import dance from '../../assets/login.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Title from "../../../PageTitle/Title";

const login = () => {

    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, popUpGoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelLogin = data => {
        setError('')
        login(data.email, data.password)
            .then(userCredential => {
                if (userCredential.user.email) {
                    fetch(`http://localhost:5000/login-user/${userCredential.user.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.role === 'instructor') {
                                navigate('/instructor-dashboard');
                            } else if (data.role === 'admin') {
                                navigate('/admin-dashboard');
                            } else if (data.role === 'student') {
                                navigate('/');
                            }
                        })
                }
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })

    }

    const googleLogin = () => {
        popUpGoogleLogin()
            .then(loggedUser => {
                console.log(loggedUser);
                const loggedUserInfo = { name: loggedUser.user?.displayName, email: loggedUser.user?.email, photo: loggedUser.user?.photoURL, role: 'student' }
                fetch('http://localhost:5000/login-user', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(loggedUserInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.user.role === 'admin') {
                            navigate('/admin-dashboard');
                            if (loggedUser.user.email) {
                                toast.success('Login Successfully', {
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
                        } else if (data.user.role === 'instructor') {
                            navigate('/instructor-dashboard');
                            if (loggedUser.user.email) {
                                toast.success('Login Successfully', {
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
                        } else if (data.user.role === 'student') {
                            navigate('/');
                            if (loggedUser.user.email) {
                                toast.success('Login Successfully', {
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
                    });
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Title title={'Login'}></Title>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <img src={dance} alt="dance image" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center">Login now!</h1>
                        <form onSubmit={handleSubmit(handelLogin)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className="mt-1 text-red-500">Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { minLength: 6 })} placeholder="password" className="input input-bordered" required />
                                {errors.password && <span className="mt-1 text-red-500">Password field is required</span>}
                                {errors.password?.type == 'minLength' && <span className="mt-1 text-red-500">Minimum 6 characters required</span>}
                                {/* {errors.password?.type == 'pattern' && <span className="mt-1 text-red-500">capital letter & special character</span>} */}
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value='Login' className="btn btn-primary text-white" />
                            </div>
                        </form>
                        <button onClick={googleLogin} className="btn border-slate-400 my-3">
                            <img width="28" height="28" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />
                            <span className="text-slate-600">Login with Google</span>
                        </button>
                        <p className="text-sm text-center text-slate-500">Don,t have an account <NavLink to='/register' className='text-slate-800 underline font-medium'>Register</NavLink></p>
                        {
                            error && <p className="text-red-600 mt-2 mx-auto text-sm flex gap-x-2"><img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/dc2626/error--v1.png" alt="error--v1" /> {error}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;