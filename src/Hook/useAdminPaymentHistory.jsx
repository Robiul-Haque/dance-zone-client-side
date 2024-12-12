import { useQuery } from "@tanstack/react-query";

const useAdminPaymentHistory = () => {
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await fetch('https://dance-zone-server.vercel.app/all-payment-history');
            return res.json();
        }
    })
    return { data, refetch, isLoading }
};

export default useAdminPaymentHistory;