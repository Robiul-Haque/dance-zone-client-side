import { useQuery } from "@tanstack/react-query";

const useAdminManageUser = () => {
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/manage-user', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
                }
            });
            return res.json();
        }
    })
    return { data, isLoading, refetch };
};

export default useAdminManageUser;