import { useEffect, useState } from "react";


const Class = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/home/class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    return (
        <div className="my-20">
            <h1 className='text-4xl font-semibold text-center mb-10'>Popular Class</h1>
            <div className="flex justify-center flex-wrap lg:gap-34 md:gap-24 gap-4">
                {
                    classes.map(data => <>
                        <div key={data?._id} className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl">
                            <figure><img src={data?.class_image} alt={data?.class_name} className="h-64 w-full object-cover" /></figure>
                            <div className="card-body">
                                <h2 className="card-title mx-auto text-gray-500">{data?.class_name}</h2>
                                <div className="my-3 flex justify-between">
                                    <span className="font-bold text-gray-500">Price {data?.course_price} $</span>
                                    <span className="font-bold text-gray-500">Available Seat {data?.available_seats}</span>
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-primary w-full">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default Class;