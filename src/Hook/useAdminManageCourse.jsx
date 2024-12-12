import { useQuery } from "@tanstack/react-query";

const useAdminManageCourse = () => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await fetch('https://dance-zone-server.vercel.app/manage-course')
            return res.json();
        }
    })
    return { data, isLoading, refetch };
};

export default useAdminManageCourse;