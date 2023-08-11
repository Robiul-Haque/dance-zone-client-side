import { useForm } from 'react-hook-form';
import edit_class from '../../../../assets/edit_class.png'
import { useContext } from 'react';
import { AuthContext } from '../../../../Auth/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCourse = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const { _id, class_name, class_image, available_seats, course_price } = useLoaderData();
    const navigate = useNavigate();

    const editClass = data => {
        const formData = { ...data, instructor_name: user?.displayName, instructor_email: user?.email, status: 'pending', feedback: '' };

        if (formData) {
            fetch(`http://localhost:5000/my-course/update-data/${_id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.modifiedCount > 0) {
                        navigate('/instructor-dashboard/my-course');
                        toast.success('Course Update Successful', {
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

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <img src={edit_class} alt="dance image" className="md:w-96" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center">Edit My Course!</h1>
                        <form onSubmit={handleSubmit(editClass)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Name</span>
                                </label>
                                <input type="text" {...register("class_name")} placeholder="Class Name" className="input input-bordered" defaultValue={class_name} required />
                                {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Image</span>
                                </label>
                                <input type="text" {...register("class_image")} placeholder="Class Image URL" className="input input-bordered" defaultValue={class_image} required />
                                {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Name</span>
                                </label>
                                <input type="text" {...register("instructor_name")} defaultValue={user?.displayName} className="input input-bordered" disabled />
                                {errors.instructor_name && <span className="mt-1 text-red-500">Instructor Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Email</span>
                                </label>
                                <input type="email" {...register("instructor_email")} defaultValue={user?.email} className="input input-bordered" disabled />
                                {errors.instructor_email && <span className="mt-1 text-red-500">Instructor Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Available Seats</span>
                                </label>
                                <input type="number" {...register("available_seats")} placeholder="Available Seats" className="input input-bordered" defaultValue={available_seats} required />
                                {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" {...register("course_price")} placeholder="Price" className="input input-bordered" defaultValue={course_price} required />
                                {errors.name && <span className="mt-1 text-red-500">Name field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value='Update' className="btn btn-primary text-white" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;