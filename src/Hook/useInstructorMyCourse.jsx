import { useQuery } from "@tanstack/react-query";

const useInstructorMyCourse = () => {
    const { data = [], refetch, isLoading} = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/my-course')
            return res.json();
        }
    });
    return {data, refetch, isLoading}
};

export default useInstructorMyCourse;