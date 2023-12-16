import { useQuery } from "@tanstack/react-query";

const useAdminManageCourse = () => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await fetch('https://dance-zone-server-side.vercel.app/manage-course', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
                }
            })
            return res.json();
        }
    })
    return { data, isLoading, refetch };
};

export default useAdminManageCourse;