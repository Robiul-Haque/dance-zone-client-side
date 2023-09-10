import { useLoaderData } from "react-router-dom";
import Title from "../../../../PageTitle/Title";

const Dashboard = () => {

    const studentStatices = useLoaderData();

    return (
        <>
            <Title title={'Student Dashboard'}></Title>
            <div className="flex lg:gap-10 flex-wrap">
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Enrolled Course</h2>
                        <h2>{studentStatices?.enrolledCourse?.length}</h2>
                    </div>
                </div>
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500">
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Selected Course</h2>
                        <h2>{studentStatices?.selectedCourse?.length}</h2>
                    </div>
                </div>
                <div className="bg-base-200 w-80 h-40 flex justify-center items-center rounded-lg border text-gray-500 indicator">
                    <span className="indicator-item badge badge-gray p-3 top-4 right-12 font-medium ml-5">Upcoming</span>
                    <div className="text-center text-2xl font-medium">
                        <h2 className="mb-3">Upcoming Course</h2>
                        <h2>{studentStatices?.upcomingCourse?.length}</h2>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg mt-16 border text-center">
                <h2 className="text-base font-medium text-gray-500 py-4 bg-base-200">Upcoming Total Course: {studentStatices?.upcomingCourse?.length}</h2>
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
                            studentStatices?.upcomingCourse?.map(data => {
                                return (
                                    <tr key={data?._id}>
                                        <td><img src={data?.class_image} alt={data?.class_name} className="w-12 h-12 rounded-xl mx-auto" /></td>
                                        <td>{data?.class_name}</td>
                                        <td>{data?.course_price}</td>
                                        <td>{data?.instructor_name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Dashboard;