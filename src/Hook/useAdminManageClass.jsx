import { useQuery } from "@tanstack/react-query";

const useAdminManageClass = () => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/manage-class')
            return res.json();
        }
    })
    return {data, isLoading, refetch};
};

export default useAdminManageClass;