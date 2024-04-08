import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
 name: 'movie',
 initialState: { 
   movies: [],
   upcoming: [],
   movie: {
    id: "",
    imdb_id: "",
    title: "",
    overview: "",
    poster: "",    
   }, 
   isLoading: true,
   errors: "",
   page: null,
   searchKey: "",
   streamingInfo: [],
   video: "",
   genre: {
    id: "",
    name: "",
   },
   selectedGenre: null,
 }, 
 reducers: {
 setMovies: (state, action) =>{
    state.movies = action.payload;
    state.isLoading = false;
 },
 startLoadingMovies: (state) => {
    state.isLoading = true;
 },
 finishLoadingMovies: (state) => {
  state.isLoading = false;
 },
 setPage: (state, action) => {
  state.page = action.payload;
 },
  setSearchKey: (state, action) => {
    state.searchKey = action.payload
  },
  setMovie: (state, action) => {
    state.movie = action.payload;
  },
  setStreamingInfo: (state, action) => {
    state.streamingInfo = action.payload;
  },
  setVideo: (state, action) => {
    state.video = action.payload;
  },
  setGenre: (state, action) => {
    state.selectedGenre = action.payload;
  },
  setUpcoming: (state, action) => {
    state.upcoming = action.payload;
  }
},
})

export const { setMovies, startLoadingMovies, finishLoadingMovies, setPage, setSearchKey, setMovie, setStreamingInfo, setVideo, setGenre, setUpcoming } = movieSlice.actions

export const movieReducer = movieSlice.reducer