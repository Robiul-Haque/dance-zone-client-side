import { useQuery } from "@tanstack/react-query";

const useAdminPaymentHistory = () => {
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await fetch('https://dance-zone-server-side.vercel.app/all-payment-history', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
                }
            });
            return res.json();
        }
    })
    return { data, refetch, isLoading }
};

export default useAdminPaymentHistory;