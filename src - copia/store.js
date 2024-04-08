import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./slices/movies/movieSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer
    }
});