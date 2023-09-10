import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Auth/AuthProvider";
import Title from "../../../../PageTitle/Title";

const Course = () => {

    const allCourse = useLoaderData();
    const { user } = useContext(AuthContext);

    const selectCourse = courseData => {
        const singleCourseData = { id: courseData?._id, class_name: courseData?.class_name, class_image: courseData?.class_image, course_price: courseData?.course_price, available_seats: courseData?.available_seats, instructor_name: courseData?.instructor_name, instructor_email: courseData?.instructor_email }

        fetch('http://localhost:5000/student/selected-course', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(singleCourseData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Course Selected Successfully', {
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
        <>
            <Title title={'Course'}></Title>
            <div className="lg:mt-20 md:mt-15 mt-6 mx-5">
                <h1 className="text-center lg:font-extrabold md:font-extrabold font-bold text-4xl text-gray-600">Elegance in Motion Discover the Rhythm of Dance</h1>
                <p className="text-center font-medium lg:text-lg md:text-lg text-gray-500 lg:mt-3 md:mt-2 mt-5">Join us in a captivating journey of grace music and passion Experience dance like never before</p>
            </div>
            <div className="lg:px-80 lg:py-20 md:px-80 md:py-20 pt-5 mb-20">
                <h1 className="text-center lg:font-bold md:font-bold font-normal lg:text-3xl md:text-3xl text-2xl text-gray-600 lg:mb-16 md:mb-16 my-10">Our Best Dance Course</h1>
                <div className="grid md:grid-cols-2 md:gap-14 lg:gap-16 gap-y-10">
                    {
                        allCourse?.map(courseData => {
                            return (
                                <div key={courseData?._id} className="card card-side bg-base-100 shadow-xl hover:shadow-2xl">
                                    <figure><img src={courseData?.class_image} alt={courseData?.class_name + "Class Image"} className="lg:w-64 lg:h-64 md:w-64 md:h-64 w-64 h-80" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl font-bold text-gray-500">{courseData?.class_name}</h2>
                                        <p className="text-gray-500 font-medium">Instructor name: <span className="font-bold">{courseData?.instructor_name}</span></p>
                                        <p className="text-gray-500 font-medium">Available seats: <span className="font-bold">{courseData?.available_seats}</span></p>
                                        <p className="text-gray-500 font-medium">Course price: <span className="font-bold">{courseData?.course_price} $</span></p>
                                        <div className="card-actions flex lg:flex-nowrap md:flex-nowrap flex-wrap">
                                            {
                                                user?.email ? <>
                                                    <Link to={`/student/dashboard/checkout/${courseData?._id}`} className={courseData?.available_seats === 0 ? 'btn btn-disabled mt-2' : 'btn btn-neutral mt-2'}>Enroll Now</Link>
                                                    <button onClick={() => selectCourse(courseData)} className={courseData?.available_seats === 0 ? 'btn btn-disabled mt-2' : 'btn btn-outline btn-primary mt-2'}>Select This Course</button>
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
        </>
    );
};

export default Course;