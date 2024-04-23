import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
 name: 'movie',
 initialState: { 
   movies: [],
   upcoming: [],
   trending: [],
   topRated: [],
   credits: [],
   similar: [],
   mediaType: 'movie',
   movie: {
    id: "",
    imdb_id: "",
    title: "",
    overview: "",
    poster: "",
    backdrop_path:"",
    tagline:"",
    directorName: "",
    directorProfilePath: ""    
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
  },
  setTrending: (state, action) => {
    state.trending = action.payload;
  },
  setTopRated: (state, action) => {
    state.topRated = action.payload;
  },
  setMediaType: (state, action) =>{
    state.mediaType = action.payload;
  },
  setCredits: (state, action) => {
    state.credits = action.payload;
  },
  setSimilar: (state, action) => {
    state.similar = action.payload;
  }
},
})

export const { setMovies, startLoadingMovies, finishLoadingMovies, setPage, 
  setSearchKey, setMovie, setStreamingInfo, setVideo, setGenre, setUpcoming, 
  setTrending, setTopRated, setMediaType, setCredits, setSimilar } = movieSlice.actions

export const movieReducer = movieSlice.reducer