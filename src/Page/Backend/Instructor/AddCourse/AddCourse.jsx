import { useForm } from "react-hook-form";
import add_class from '../../../../assets/add-a-class.png';
import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelRegister = data => {
        const formData = { ...data, instructor_name: user?.displayName, instructor_email: user?.email, status: 'pending', feedback: '' }

        if (formData) {
            fetch('http://localhost:5000/add-course', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        navigate('/instructor-dashboard/my-course');
                        toast.success('Class Add Successful', {
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
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <img src={add_class} alt="dance image" className="md:w-96" />
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
                                <input type="number" {...register("course_price")} placeholder="Price" className="input input-bordered" required />
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
    );
};

export default AddCourse;