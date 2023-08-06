import { useEffect, useState } from 'react';


const Instructor = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/home/instructor')
            .then(res => res.json())
            .then(data => setInstructors(data))
    })

    return (
        <div className='my-20'>
            <h1 className="text-4xl font-semibold text-center mb-10">Popular Instructor</h1>
            <div className='flex justify-center gap-8 flex-wrap'>
                {
                    instructors?.map(instructor => <div key={instructor._id}>
                        <img src={instructor?.photo} alt="instructor_1" className='w-56 h-56 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
                        <h2 className='text-xl text-center font-semibold mt-4'>{instructor?.name}</h2>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructor;