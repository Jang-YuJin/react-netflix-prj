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
};

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
};

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
};

const fetchSearchMovie = (keyword, sort, startDate, endDate, rating, selectedGenres, page) => {
    let addr = '';

    if(!keyword){
        if(sort === '' && startDate == '' && endDate === '' && rating === 0 && selectedGenres.length === 0){
            addr = `/movie/popular?language=ko-kr&page=${page}`;
        } else{
            addr = `/discover/movie?language=ko-kr&page=${page}`;
            if(sort !== ''){
                addr += `&sort_by=${sort}`;
            }
            if(startDate !== ''){
                addr += `&primary_release_date.gte=${startDate}`;
            }
            if(endDate !== ''){
                addr += `&primary_release_date.lte=${endDate}`;
            }
            if(rating !== 0){
                addr += `&vote_average.gte=${rating}`;
            }
            if(selectedGenres.length !== 0){
                let genre = selectedGenres.join('|');
                addr += `&with_genres=${genre}`;
            }
        }
    } else{
        addr = `/search/movie?language=ko-kr&query=${keyword}&&page=${page}`;
    }
    return api.get(addr);
};

export const useSearchMovie = (keyword, sort, startDate, endDate, rating, selectedGenres, page) => {
    return useQuery({
        queryKey: ['movie-search', {keyword, sort, startDate, endDate, rating, selectedGenres, page}],
        queryFn: () => fetchSearchMovie(keyword, sort, startDate, endDate, rating, selectedGenres, page),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};

const fetchGetMovie = (id) => {
    return api.get(`/movie/${id}?language=ko-kr`);
};

export const useGetMovie = (id) => {
    return useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchGetMovie(id),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};

const fetchRecommendMovie = (id) => {
    return api.get(`/movie/${id}/recommendations?language=ko-kr`);
};

export const useRecommendMovie = (id) => {
    return useQuery({
        queryKey: ['recommendMovie', id],
        queryFn: () => fetchRecommendMovie(id),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};

const fetchTrailerMovie = (id) => {
    return api.get(`/movie/${id}/videos`);
};

export const useTrailerMovie = (id) => {
    return useQuery({
        queryKey: ['trailerMovie', id],
        queryFn: () => fetchTrailerMovie(id),
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
        select: (data) => data.data
    })
};