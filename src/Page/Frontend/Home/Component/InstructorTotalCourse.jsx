/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const InstructorTotalCourse = ({ email }) => {

    const [course, setCourse] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/single-instructor/total-course-count/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCourse(data)
                }
            })
    }, [email])

    return (
        <>
            <p className="my-2">Instructor Total Course: {course.length}</p>
        </>
    );
};

export default InstructorTotalCourse;