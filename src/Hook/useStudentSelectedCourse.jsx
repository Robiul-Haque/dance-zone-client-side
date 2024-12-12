import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useStudentSelectedCourse = () => {

    const { user } = useContext(AuthContext);

    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['studentSelectedCourse'],
        queryFn: async () => {
            const res = await fetch(`https://dance-zone-server.vercel.app/student/selected-all-course/${user?.email}`);
            return res.json();
        }
    })
    return { data, refetch, isLoading }
};

export default useStudentSelectedCourse;