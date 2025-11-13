import { useQuery } from "@tanstack/react-query"
import api from '../utils/api'

const fetchReview = (id, page) => {
    return api.get(`/movie/${id}/reviews?page=${page}`);
};

export const useReview = (id, page) => {
    return useQuery({
        queryKey: ['review', id, page],
        queryFn: () => fetchReview(id, page),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};