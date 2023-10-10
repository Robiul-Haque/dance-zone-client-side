import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Auth/AuthProvider";

const Course = () => {

    const [courses, setCourse] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/home/course')
            .then(res => res.json())
            .then(data => setCourse(data))
    }, [])

    return (
        <div className="my-20">
            <h1 className='text-4xl font-semibold text-center mb-10'>Popular Course</h1>
            <div className="flex justify-center flex-wrap lg:gap-34 md:gap-24 gap-y-12">
                {
                    courses.map(allCourse => {
                        return (
                            <div key={allCourse?._id} className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl">
                                <figure><img src={allCourse?.class_image} alt={allCourse?.class_name} className="h-64 w-full object-cover" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-gray-500">{allCourse?.class_name}</h2>
                                    <div className="my-3 flex justify-between">
                                        <span className="font-bold text-gray-500">Price {allCourse?.course_price} $</span>
                                        <span className="font-bold text-gray-500">Available Seat {allCourse?.available_seats}</span>
                                    </div>
                                    <div className="card-actions">
                                        {
                                            user?.email ?
                                                <Link to={`/student/dashboard/course/enroll/checkout/${allCourse?._id}`} className={allCourse?.available_seats === 0 ? 'btn btn-disabled w-full' : 'btn btn-neutral w-full'}>Enroll Now</Link>
                                                :
                                                <Link to={'/login'} className={allCourse?.available_seats === 0 ? 'btn btn-disabled w-full' : 'btn btn-neutral w-full'}>Enroll Now</Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Course;