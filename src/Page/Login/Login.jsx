/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import dance from '../../assets/login.png';
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { NavLink } from "react-router-dom";

const login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, popUpGoogleLogin } = useContext(AuthContext);

    const handelRegister = data => {
        console.log(data);
        login(data.email, data.password)
            .then(userCredential => {
                console.log(userCredential);
            })
            .catch(error => {
                console.log(error);
            })

    }

    const googleLogin = () => {
        popUpGoogleLogin()
            .then(loggedUser => {
                console.log(loggedUser);
                // if (loggedUser.email) {
                //     toast.success('Login Successful', {
                //         position: "top-right",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //         theme: "dark",
                //     });
                // }
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
                        <h1 className="text-2xl font-bold text-center">Login now!</h1>
                        <form onSubmit={handleSubmit(handelRegister)}>
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
                    </div>
                </div>
            </div>
            {/* <ToastContainer
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
            /> */}
        </div>
    );
};

export default login;