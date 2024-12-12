/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const InstructorEnrollBtn = ({ course }) => {

    fetch('https://dance-zone-server.vercel.app/student/selected-course/create-payment-intent', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ price: course?.course_price })
    })

    return (
        <>
            <Link to={`/student/dashboard/checkout/${course?._id}`} className="btn btn-neutral">Enroll Now</Link>
        </>
    );
};

export default InstructorEnrollBtn;