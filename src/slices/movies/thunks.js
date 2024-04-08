import { setMovies, startLoadingMovies, finishLoadingMovies, setMovie, setStreamingInfo, setVideo, setUpcoming, setPage, setTrending } from "./movieSlice";

export const fetchMovies = (searchKey, page, selectedGenre) => async (dispatch) => {
  dispatch(startLoadingMovies());

  if (page === null) {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    dispatch(setPage(randomPage));
  }
  
  let queryParams = {
    searchKey,
    page,
    selectedGenre
  };  

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `http://localhost:8000/movies?${queryString}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();
    dispatch(setMovies(data));
    
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(finishLoadingMovies());
  }
};

export const fetchMovieAction = (id) => async (dispatch) => {
  dispatch(startLoadingMovies());
  
  const url = `http://localhost:8000/movie/${id}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching movie: ${response.statusText}`);
    }

    const data = await response.json();
    dispatch(setMovie(data));
    dispatch(setStreamingInfo(data.streamingInfo));
    dispatch(setVideo(data.trailer))
    
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(finishLoadingMovies());
  }
};

export const fetchMovieUpComing = () => async(dispatch) => {
  dispatch(startLoadingMovies());

  const url = `http://localhost:8000/movies/upcoming`

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching upcoiming movies: ${response.statusText}`);
    }

    const data = await response.json();
    dispatch(setUpcoming(data));
    
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(finishLoadingMovies());
  }
}

export const fetchTrendingData = () => async(dispatch) => {
  dispatch(startLoadingMovies());

  const url = `http://localhost:8000/trending/all`

  try {
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching trending movies: ${response.statusText}`);
    }

    const data = await response.json();
    dispatch(setTrending(data));
        
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(finishLoadingMovies());
  }
}
