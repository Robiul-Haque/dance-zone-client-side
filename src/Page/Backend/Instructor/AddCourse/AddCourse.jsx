import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Title from "../../../../../PageTitle/Title";
import Lottie from "lottie-react";
import add_course from '../../../../assets/add_course.json';

const AddCourse = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelRegister = data => {
        const formData = { ...data, instructor_name: user?.displayName, instructor_email: user?.email, status: 'pending', feedback: '', view_status: 'unseen' }

        if (formData) {
            fetch(`https://dance-zone-server-side.vercel.app/add-course/${user?.email}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        navigate('/instructor-dashboard/my-course');
                        toast.success('Class Add Successfully', {
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
        reset();
    }

    return (
        <>
            <Title title={'Add New Course'}></Title>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-right">
                        <Lottie animationData={add_course} loop={true}></Lottie>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-2xl font-bold text-center">Add New Course!</h1>
                            <form onSubmit={handleSubmit(handelRegister)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Course Name</span>
                                    </label>
                                    <input type="text" {...register("class_name")} placeholder="Class Name" className="input input-bordered" required />
                                    {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Course Image</span>
                                    </label>
                                    <input type="text" {...register("class_image")} placeholder="Class Image URL" className="input input-bordered" required />
                                    {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Instructor Name</span>
                                    </label>
                                    <input type="text" {...register("instructor_name")} value={user?.displayName} className="input input-bordered" disabled />
                                    {errors.instructor_name && <span className="mt-1 text-red-500">Instructor Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Instructor Email</span>
                                    </label>
                                    <input type="email" {...register("instructor_email")} value={user?.email} className="input input-bordered" disabled />
                                    {errors.instructor_email && <span className="mt-1 text-red-500">Instructor Email field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Available Seats</span>
                                    </label>
                                    <input type="number" {...register("available_seats")} placeholder="Available Seats" className="input input-bordered" required />
                                    {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input type="number" {...register("course_price")} placeholder="$" className="input input-bordered" required />
                                    {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input type='submit' value='Add Course' className="btn btn-primary text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCourse;