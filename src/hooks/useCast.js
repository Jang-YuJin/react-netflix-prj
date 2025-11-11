import { useQuery } from "@tanstack/react-query"
import api from '../utils/api'

const fetchGetCast = (id) => {
    return api.get(`/movie/${id}/credits?language=ko-kr`);
};

export const useGetCast = (id) => {
    return useQuery({
        queryKey: ['cast'],
        queryFn: () => fetchGetCast(id),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};