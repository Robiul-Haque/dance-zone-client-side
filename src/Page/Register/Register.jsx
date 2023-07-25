import { useForm } from "react-hook-form";
import dance from '../../assets/login.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { updateProfile } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const { createUser, popUpGoogleLogin } = useContext(AuthContext);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handelRegister = data => {
        console.log(data);
        reset()
        setSuccessMessage('');
        setErrorMessage('');

        createUser(data.email, data.password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                if (loggedUser.email) {
                    toast.success('Registration Successful', {
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
                updateUserInfo(loggedUser, data.name, data.photo);
                setSuccessMessage('Registration Successful');
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message);
            })

        const updateUserInfo = (user, name, photo) => {
            updateProfile(user, {
                displayName: name,
                photoURL: photo,
            })
        }
    }

    const googleLogin = () => {
        popUpGoogleLogin()
            .then(loggedUser => {
                console.log(loggedUser);
                if (loggedUser.email) {
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
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <img src={dance} alt="dance image" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center">Register now!</h1>
                        <form onSubmit={handleSubmit(handelRegister)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} placeholder="name" className="input input-bordered" required />
                                {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className="mt-1 text-red-500">Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photo")} placeholder="photo url" className="input input-bordered" required />
                                {/* {errors.photo && <span className="mt-1 text-red-500">Photo URL field is required</span>} */}
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" {...register("confirm_password", {
                                    validate: data => {
                                        if (watch('password') !== data) {
                                            return 'Password not match'
                                        }
                                    }
                                })} placeholder="confirm password" className="input input-bordered" required />
                                <span className="mt-1 text-red-500">{errors.confirm_password?.message}</span>
                                {/* {errors.confirm_password && <span className="mt-1 text-red-500">Confirm Password field is required</span>} */}
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value='Register' className="btn btn-primary text-white" />
                            </div>
                        </form>
                        <button onClick={googleLogin} className="btn border-slate-400 my-3">
                            <img width="28" height="28" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />
                            <span className="text-slate-600">Login with Google</span>
                        </button>
                        <p className="text-sm text-center text-slate-500">You have an account <NavLink to='/login' className='text-slate-800 underline font-medium'>Login</NavLink></p>
                        {
                            successMessage && <span className="mt-2 text-green-500 text-center">{successMessage}</span>
                        }
                        {
                            errorMessage && <span className="mt-2 text-red-500 text-center">{errorMessage}</span>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Register;