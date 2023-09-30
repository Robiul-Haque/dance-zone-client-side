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
        setRegistrationLoading(true)
        setErrorMessage('')

        createUser(data.email, data.password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                updateUserInfo(loggedUser, data.name, data.photo);
                reset()
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

            userLogout()
            setRegistrationLoading(false)

            const loggedUserInfo = { name: name, email: user.email, photo: photo, role: 'student' }
            fetch('https://summer-camp-backend-rho.vercel.app/login-user', {
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
                fetch('https://summer-camp-backend-rho.vercel.app/login-user', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(loggedUserInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        fetch('https://summer-camp-backend-rho.vercel.app/create-jwt-token', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json', },
                            body: JSON.stringify({ email: data?.email })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data?.token) {
                                    localStorage.setItem('jwt-access-token', data?.token);

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

                        fetch(`https://summer-camp-backend-rho.vercel.app/check/user-role/${loggedUser?.user?.email}`)
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
                                } else if (data.role === 'instructor') {
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
        <div className="hero min-h-screen bg-base-200">
            <Title title={'Register'}></Title>
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
                                <input type='submit' value='Register' className="btn btn-primary text-white" disabled={registrationLoading} />
                            </div>
                        </form>
                        <div className="divider my-2">OR</div>
                        <button onClick={googleLogin} className="btn border-slate-400">
                            <img width="28" height="28" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" />
                            <span className="text-slate-600">Login with Google</span>
                        </button>
                        <p className="text-sm text-center text-slate-500 my-2">You have an account <NavLink to='/login' className='text-slate-800 underline font-medium'>Login</NavLink></p>
                        {
                            errorMessage && <span className="text-red-500 text-center">{errorMessage}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;