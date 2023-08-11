import { useQuery } from "@tanstack/react-query";

const useStudentSelectedCourse = () => {
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['studentSelectedCourse'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/student/selected-all-course');
            const data = res.json();
            return data;
        }
    })
    return { data, refetch, isLoading }
};

export default useStudentSelectedCourse;