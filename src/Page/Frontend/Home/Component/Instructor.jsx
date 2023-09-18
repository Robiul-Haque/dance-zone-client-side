import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InstructorTotalCourse from './InstructorTotalCourse';


const Instructor = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/home/instructor')
            .then(res => res.json())
            .then(data => setInstructors(data));
    })

    return (
        <div className='my-20'>
            <h1 className="text-4xl font-semibold text-center mb-16">Popular Instructor</h1>
            <div className='flex justify-center lg:gap-34 md:gap-24 gap-y-12 flex-wrap'>
                {
                    instructors?.map(instructors => {
                        return (
                            <div key={instructors?._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={instructors?.photo} alt={instructors?.name + 'Photo'} className="w-full h-64 object-cover" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl font-bold text-gray-500">{instructors?.name}</h2>
                                    <InstructorTotalCourse email={instructors?.email}></InstructorTotalCourse>
                                    <Link to={`/instructor/see-all-course/${instructors?.email}`} className="btn btn-neutral w-full">See Instructor Course</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Instructor;