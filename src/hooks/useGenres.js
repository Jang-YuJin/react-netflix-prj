import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchMoviesGenre = () => {
    return api.get(`/genre/movie/list?language=ko-kr`);
}

export const useMoviesGenre = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchMoviesGenre,
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    });
};