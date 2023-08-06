import { useEffect, useState } from "react";


const Class = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/home/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    })

    return (
        <div className="my-20">
            <h1 className='text-4xl font-semibold text-center mb-10'>Popular Class</h1>
            {
                classes.length > 0 ? classes.map(data => <div key={data._id} className="flex gap-4 justify-center">
                    <div>
                        <img src={data?.class_image} alt="instructor_1" className='w-56 h-56 object-cover rounded-lg border-4 border-base-200 shadow-lg shadow-neutral-500' />
                        <h2 className='text-xl text-center font-semibold mt-4'>Class name: {data?.class_name}</h2>
                    </div>
                </div>)
                    :
                    <h3 className="text-center">No Class Found</h3>
            }
        </div>
    );
};

export default Class;