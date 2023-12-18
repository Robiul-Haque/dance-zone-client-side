import { useQuery } from "@tanstack/react-query";

const useAdminManageUser = () => {
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('https://dance-zone-server-side.vercel.app/manage-user');
            return res.json();
        }
    })
    return { data, isLoading, refetch };
};

export default useAdminManageUser;