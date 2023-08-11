import { useEffect, useState } from "react";

const Course = () => {

    const [courses, setCourse] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/home/course')
            .then(res => res.json())
            .then(data => setCourse(data))
    }, [])

    return (
        <div className="my-20">
            <h1 className='text-4xl font-semibold text-center mb-10'>Popular Course</h1>
            <div className="flex justify-center flex-wrap lg:gap-34 md:gap-24 gap-4">
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
                                        <button className="btn btn-primary w-full">Enroll Now</button>
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