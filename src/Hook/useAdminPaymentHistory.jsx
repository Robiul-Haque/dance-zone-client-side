import { useQuery } from "@tanstack/react-query";

const useAdminPaymentHistory = () => {
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/all-payment-history');
            return res.json();
        }
    })
    return { data, refetch, isLoading }
};

export default useAdminPaymentHistory;