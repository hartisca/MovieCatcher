import { setMovies, startLoadingMovies, finishLoadingMovies, setMovie, setStreamingInfo, setVideo, setUpcoming, setPage, setTrending, setTopRated } from "./movieSlice";

export const fetchMovies = (searchKey, page, selectedGenre, mediaType) => async (dispatch) => {
  dispatch(startLoadingMovies());

  if (page === null) {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    dispatch(setPage(randomPage));
  }
  
  let queryParams = {
    searchKey,
    page,
    selectedGenre,
    mediaType
  };  

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `http://localhost:8000/movie?${queryString}`;
  
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

export const fetchMovieAction = (id, mediaType) => async (dispatch) => {
  dispatch(startLoadingMovies());  
  
  const url = `http://localhost:8000/${mediaType}/${id}`;
  
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

export const fetchHomeData = (mediaType) => async (dispatch) => {
  dispatch(startLoadingMovies());

  const homeUrl = `http://localhost:8000/home/${mediaType}`;

  try {
    const homeResponse = await fetch(homeUrl);

    if (!homeResponse.ok) {
      throw new Error(`Error fetching home data: ${homeResponse.statusText}`);
    }

    const homeData = await homeResponse.json();

    dispatch(setTrending(homeData.trending));
    dispatch(setTopRated(homeData.topRated));
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(finishLoadingMovies());
  }
};