// import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const Instructor = () => {

    const allInstructor = useLoaderData();
    // allInstructor.map(data => console.log(data.email));

    // useEffect(() => {
    //     fetch(`http://localhost:5000/single-instructor/total-course-count`)
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, [])

    return (
        <>
            <div className="md:mt-20">
                <h1 className="text-center font-extrabold text-4xl text-gray-600">Dance Masters Shaping Dreams One Step at a Time</h1>
                <p className="text-center font-medium text-lg text-gray-500 mt-2">Experience the artistry and dedication of our dance instructors igniting your passion for movement and self expression</p>
            </div>
            <div className="md:px-80 md:py-20">
                <h1 className="text-center font-bold text-3xl text-gray-600 mb-16">Our Best Instructor</h1>
                <div className="grid md:grid-cols-3 md:gap-16 gap-4">
                    {
                        allInstructor?.map(classData => {
                            return (
                                <div key={classData?._id} className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src={classData?.photo} alt={classData?.name + 'Photo'} className="w-full h-64 object-cover" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl font-bold text-gray-500">{classData?.name}</h2>
                                        <p className="my-2">Instructor Total Course: </p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-neutral w-full">See Instructor Course</button>
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

export default Instructor;