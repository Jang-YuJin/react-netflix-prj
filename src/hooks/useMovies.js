import { useQuery } from "@tanstack/react-query"
import api from '../utils/api'

const fetchPopularMovies = () => {
    return api.get(`/movie/popular?language=ko-kr`);
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
    return api.get(`/movie/top_rated?language=ko-kr`);
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
    return api.get(`/movie/upcoming?language=ko-kr`);
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

const fetchSearchMovie = (keyword, page) => {
    return !keyword ? api.get(`/movie/popular?language=ko-kr&page=${page}`) : api.get(`/search/movie?language=ko-kr&query=${keyword}&&page=${page}`);
};

export const useSearchMovie = (keyword, page) => {
    return useQuery({
        queryKey: ['movie-search', {keyword, page}],
        queryFn: () => fetchSearchMovie(keyword, page),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};