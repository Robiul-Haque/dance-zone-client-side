import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthProvider";
import { toast } from "react-toastify";
import InstructorEnrollBtn from "./InstructorEnrollBtn";

const InstructorSeeCourse = () => {

    const { user } = useContext(AuthContext);
    const allCourse = useLoaderData();

    const selectCourse = courseData => {
        const singleCourseData = {
            id: courseData?._id,
            class_name: courseData?.class_name,
            class_image: courseData?.class_image,
            course_price: courseData?.course_price,
            available_seats: courseData?.available_seats,
            instructor_name: courseData?.instructor_name,
            instructor_email: courseData?.instructor_email
        }

        fetch('http://localhost:5000/student/selected-course', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(singleCourseData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Course Selected Successful', {
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

    return (
        <div>
            <div className="md:px-80 md:py-20">
                <h1 className="text-center font-bold text-3xl text-gray-600 mb-16">Explore Instructor Best Dance Course</h1>
                <div className="grid md:grid-cols-2 md:gap-16 gap-4">
                    {
                        allCourse?.map(course => {
                            return (
                                <div key={course?._id} className="card card-side bg-base-100 shadow-xl hover:shadow-2xl">
                                    <figure><img src={course?.class_image} alt={course?.class_name + "Class Image"} className="w-64 h-64 object-cover" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl font-bold text-gray-500">{course?.class_name}</h2>
                                        <p className="text-gray-500 font-medium">Instructor name: <span className="font-bold">{course?.instructor_name}</span></p>
                                        <p className="text-gray-500 font-medium">Available seats: <span className="font-bold">{course?.available_seats}</span></p>
                                        <p className="text-gray-500 font-medium">Course price: <span className="font-bold">{course?.course_price} $</span></p>
                                        <div className="card-actions flex flex-nowrap">
                                            {
                                                user?.email ? <>
                                                    <InstructorEnrollBtn course={course}></InstructorEnrollBtn>
                                                    <button onClick={() => selectCourse(course)} className="btn btn-outline btn-primary">Select This Course</button>
                                                </>
                                                    :
                                                    <>
                                                        <Link to='/login' className="btn btn-neutral">Enroll Now</Link>
                                                        <Link to='/login' className="btn btn-outline btn-primary">Select This Course</Link>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default InstructorSeeCourse;