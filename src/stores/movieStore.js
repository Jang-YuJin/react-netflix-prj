import {create} from "zustand"

const movieStore = create ((set) => ({
    movies: {},
    settingMovies: (newMovies) => set({movies: newMovies}),
    page: 1,
    settingPage: (newPage) => set({page: newPage})
}));

export default movieStore;