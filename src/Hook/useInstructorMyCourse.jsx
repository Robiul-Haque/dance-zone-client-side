import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useInstructorMyCourse = () => {
    const { user } = useContext(AuthContext);

    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/my-course/${user?.email}`)
            return res.json();
        }
    });
    return { data, refetch, isLoading }
};

export default useInstructorMyCourse;