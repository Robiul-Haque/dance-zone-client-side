import { useQuery } from "@tanstack/react-query";

const useInstructorMyClass = () => {
    const { data = [], refetch, isLoading} = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/my-class')
            return res.json();
        }
    });
    return {data, refetch, isLoading}
};

export default useInstructorMyClass;