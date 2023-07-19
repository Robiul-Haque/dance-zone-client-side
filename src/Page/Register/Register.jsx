import { useForm } from "react-hook-form";
import dance from '../../assets/login.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
// import { ToastContainer, toast } from "react-toastify";

const Register = () => {

    const { createUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const handelRegister = data => {
        console.log(data);
        setSuccessMessage('');

        createUser(data.email, data.password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                // if (loggedUser.email) {
                //     toast.success('🦄 Wow so easy!', {
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
                setSuccessMessage('Registration Successful');
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
                                <input type='submit' value='Register' className="btn btn-primary" />
                            </div>
                        </form>
                        {
                            successMessage && <span className="mt-2 text-green-500 text-center">{successMessage}</span>
                        }
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

export default Register;