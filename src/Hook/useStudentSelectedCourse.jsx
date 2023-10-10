import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useStudentSelectedCourse = () => {

    const { user } = useContext(AuthContext);

    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['studentSelectedCourse'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/student/selected-all-course/${user?.email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
                }
            });
            return res.json();
        }
    })
    return { data, refetch, isLoading }
};

export default useStudentSelectedCourse;