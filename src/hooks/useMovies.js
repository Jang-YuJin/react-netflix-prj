import { useQuery } from "@tanstack/react-query"
import api from '../utils/api'

const fetchPopularMovies = () => {
    return api.get(`/movie/popular`);
};

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ['popular-movies'],
        queryFn: fetchPopularMovies,
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
}

const fetchTopRatedMovies = () => {
    return api.get(`/movie/top_rated`);
};

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['rated-movies'],
        queryFn: fetchTopRatedMovies,
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
}

const fetchUpcomingMovies = () => {
    return api.get(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ['upcoming-movies'],
        queryFn: fetchUpcomingMovies,
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
}