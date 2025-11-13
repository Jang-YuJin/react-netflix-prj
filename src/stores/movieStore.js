import {create} from "zustand"

const movieStore = create ((set) => ({
    movies: {},
    settingMovies: (newMovies) => set({movies: newMovies}),
    page: 1,
    settingPage: (newPage) => set({page: newPage}),
    likeMovie: [],
    addLikeMovie: (movie) => set((state) => ({
        likeMovie: [...state.likeMovie, movie]
    })),
    editLikeMovie: (likeMovies) => set((state) => ({
        likeMovie: likeMovies
    }))
}));

export default movieStore;