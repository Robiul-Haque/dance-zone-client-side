import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useInstructorMyCourse = () => {
    const { user } = useContext(AuthContext);

    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-backend-rho.vercel.app/my-course/${user?.email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
                }
            })
            return res.json();
        }
    });
    return { data, refetch, isLoading }
};

export default useInstructorMyCourse;