import { useQuery } from "@tanstack/react-query";

const useAdminContactMassage = () => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['contactMessage'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/show-contact-us/message')
            return res.json();
        }
    })
    return { data, isLoading, refetch }
};

export default useAdminContactMassage;