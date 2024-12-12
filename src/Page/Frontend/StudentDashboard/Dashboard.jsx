import Title from "../../../../PageTitle/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [studentStatices, setStudentStatices] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`https://dance-zone-server.vercel.app/student/all-statices/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.error) {
                    userLogout()
                        .then()
                    navigate('/login');
                } else {
                    setStudentStatices(data)
                    setLoading(false)
                }
            })
    }, [user?.email, userLogout, navigate])

    return (
        <>
            <Title title={'Student Dashboard'}></Title>
            <div className="flex lg:gap-10 flex-wrap justify-center">
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500 mb-4">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Enrolled Course</h2>
                        {
                            loading === true ? <span className="loading loading-dots loading-lg"></span>
                                :
                                studentStatices?.enrolledCourse?.length === 0 ? <p className='text-sm'>No Data Found</p>
                                    :
                                    <h2>{studentStatices?.enrolledCourse?.length}</h2>
                        }
                    </div>
                </div>
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500 mb-4 mx-4">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Selected Course</h2>
                        {
                            loading === true ? <span className="loading loading-dots loading-lg"></span>
                                :
                                studentStatices?.selectedCourse?.length === 0 ? <p className='text-sm'>No Data Found</p>
                                    :
                                    <h2>{studentStatices?.selectedCourse?.length}</h2>
                        }
                    </div>
                </div>
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <span className="indicator-item badge badge-gray p-3 top-4 right-12 font-medium ml-5">Upcoming</span>
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Upcoming Course</h2>
                        {
                            loading === true ? <span className="loading loading-dots loading-lg"></span>
                                :
                                studentStatices?.upcomingCourse?.length === 0 ? <p className='text-sm'>No Data Found</p>
                                    :
                                    <h2>{studentStatices?.upcomingCourse?.length}</h2>
                        }
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg mt-16 border text-center">
                <h2 className="text-base font-medium text-gray-500 py-4 bg-base-200">Upcoming Course: {studentStatices?.upcomingCourse?.length}</h2>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Course Image</th>
                            <th>Course Name</th>
                            <th>Course Price</th>
                            <th>Instructor Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentStatices?.upcomingCourse ?
                                studentStatices?.upcomingCourse?.map(data => {
                                    return (
                                        <tr key={data?._id}>
                                            <td><img src={data?.class_image} alt={data?.class_name} className="w-12 h-12 rounded-xl mx-auto" /></td>
                                            <td>{data?.class_name}</td>
                                            <td>{data?.course_price} $</td>
                                            <td>{data?.instructor_name}</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={4}>
                                        <span className="loading loading-dots loading-xl"></span>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Dashboard;