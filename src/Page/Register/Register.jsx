import { useForm } from "react-hook-form";
import dance from '../../assets/login.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { updateProfile } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Title from "../../../PageTitle/Title";

const Register = () => {

    const { createUser, popUpGoogleLogin, userLogout } = useContext(AuthContext);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [registrationLoading, setRegistrationLoading] = useState(false);

    const handelRegister = data => {
        setRegistrationLoading(true);
        setErrorMessage('');

        createUser(data.email, data.password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                updateUserInfo(loggedUser, data.name, data.photo);
                reset();
            })
            .catch(error => {
                setErrorMessage(error.message);
                setRegistrationLoading(false);
            })

        const updateUserInfo = (user, name, photo) => {
            updateProfile(user, {
                displayName: name,
                photoURL: photo,
            })

            userLogout();
            setRegistrationLoading(false);

            const loggedUserInfo = { name: name, email: user.email, photo: photo, role: 'student' }
            fetch('http://localhost:5000/login-user', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(loggedUserInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        navigate('/login')
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
                })
        }
    }

    const googleLogin = () => {
        popUpGoogleLogin()
            .then(loggedUser => {
                const loggedUserInfo = { name: loggedUser.user?.displayName, email: loggedUser.user?.email, photo: loggedUser.user?.photoURL, role: 'student' }
                fetch('http://localhost:5000/login-user', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(loggedUserInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        fetch('http://localhost:5000/create-jwt-token', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json', },
                            body: JSON.stringify({ email: data?.email })
                        })
                            .then(res => res.json())
                            .then()

                        fetch(`http://localhost:5000/check/user-role/${loggedUser?.user?.email}`)
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
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="min-h-screen hero bg-base-200">
            <Title title={'Register'}></Title>
            <div className="flex-col hero-content lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <img src={dance} alt="dance image" />
                </div>
                <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center">Register now!</h1>
                        <form onSubmit={handleSubmit(handelRegister)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", {
                                    required: "Name field is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters long"
                                    },

                                    maxLength: {
                                        value: 30,
                                        message: "Name must be almost 30 characters long"
                                    },
                                })} placeholder="name" className={errors.name?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                                {
                                    errors.name?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.name?.message}</p>
                                }
                            </div>
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
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photo", {
                                    required: "Photo URL field is required",
                                })} placeholder="photo url" className={errors.photo?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                                {
                                    errors.photo?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.photo?.message}</p>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" {...register("confirm_password", {
                                    required: "Confirm Password field is required",
                                    validate: data => {
                                        if (watch('password') !== data) {
                                            return 'Password not match'
                                        }
                                    }
                                })} placeholder="confirm password" className={errors.confirm_password?.message ? "input input-bordered border-red-500" : "input input-bordered"} />
                                {
                                    errors.confirm_password?.message && <p className="flex items-center gap-x-2 text-red-500 text-xs mt-3 text-center"><img width="15" height="14" src="https://img.icons8.com/small/16/FA5252/error.png" alt="error" /> {errors.confirm_password?.message}</p>
                                }
                            </div>
                            <div className="mt-6 form-control">
                                <input type='submit' value='Register' className="text-white btn btn-primary" disabled={registrationLoading} />
                            </div>
                        </form>
                        <div className="my-2 divider">OR</div>
                        <button onClick={googleLogin} className="btn border-slate-400">
                            <img width="28" height="28" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />
                            <span className="text-slate-600">Login with Google</span>
                        </button>
                        <p className="my-2 text-sm text-center text-slate-500">You have an account <NavLink to='/login' className='font-medium underline text-slate-600'>Login</NavLink></p>
                        {
                            errorMessage && <span className="text-center text-red-500">{errorMessage}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;