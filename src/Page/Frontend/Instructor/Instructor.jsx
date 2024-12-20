import { Link } from "react-router-dom";
import Title from "../../../../PageTitle/Title";
import InstructorTotalCourse from "./InstructorTotalCourse";
import { useEffect, useState } from "react";

const Instructor = () => {

    const [allInstructor, setAllInstructor] = useState([]);

    useEffect(() => {
        fetch('https://dance-zone-server.vercel.app/all-instructor')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setAllInstructor(data);
                }
            })
    }, [])

    return (
        <>
            <Title title={'Instructor'}></Title>
            <div className="mt-20 mx-2">
                <h1 className="text-center font-extrabold text-4xl text-gray-600">Dance Masters Shaping Dreams One Step at a Time</h1>
                <p className="text-center font-medium text-lg text-gray-500 mt-2">Experience the artistry and dedication of our dance instructors igniting your passion for movement and self expression</p>
            </div>
            <div className="md:px-80 py-20">
                <h1 className="text-center font-bold text-3xl text-gray-600 mb-16">Our Best Instructor</h1>
                <div className="grid justify-items-center md:grid-cols-3 md:gap-16 gap-4">
                    {
                        allInstructor?.map(data => {
                            return (
                                <div key={data?._id} className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src={data?.photo} alt={data?.name + 'Photo'} className="w-full h-64 object-cover" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl font-bold text-gray-500">{data?.name}</h2>
                                        <InstructorTotalCourse email={data?.email}></InstructorTotalCourse>
                                        <div className="card-actions justify-end">
                                            <Link to={`/instructor/see-all-course/${data?.email}`} className="btn btn-neutral w-full">See Instructor Course</Link>
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