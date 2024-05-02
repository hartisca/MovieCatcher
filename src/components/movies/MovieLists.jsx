import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../slices/movies/thunks";
import { MovieList } from "./MovieList";
import RotateLoader from "react-spinners/ClipLoader";
import {
  usePreviousPageHandler,
  useNextPageHandler,
} from "../../functions/moviesFuntions";
import Genres from "../../layout/Genres";
import './style.scss';
import HeroBanner from "../../layout/HeroBanner/HeroBanner";
import Select from 'react-select';
import { GenreList } from "../../assets/GenreList";
import { setGenre } from "../../slices/movies/movieSlice";

const MovieLists = () => {
  const [visibleMovies, setVisibleMovies] = useState(8);
  const {
    movies = [],
    isLoading,
    page,    
    selectedGenre,
    mediaType,
  } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  
  const handlePreviousPage = usePreviousPageHandler();
  const handleNextPage = useNextPageHandler();

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 8);
  };

  const handleGenreChange = (selectedGenre) => {
    if (selectedGenre) {
      const genreId = selectedGenre.id;
      dispatch(setGenre(genreId));
    } else {
      dispatch(setGenre(null));
    }
  };

  useEffect(() => {
    if (page === null) {
      dispatch(fetchMovies(null, selectedGenre, mediaType)); 
    } else{
      dispatch(fetchMovies(page, selectedGenre, mediaType));
    }
  }, [page, selectedGenre, mediaType, dispatch]);

  return (
    <>
      <HeroBanner />
      <div className="containerMovieList">
        <div className="stickyNav">
          <Genres />
          <Select
            name="genres"                   
            value={selectedGenre}
            closeMenuOnSelect={true}
            options={GenreList}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={handleGenreChange} 
            placeholder="Select genres"
            className="react-select-container genresDD"
            classNamePrefix="react-select"
            
          />
        </div>
        <div className="moviesContainer">
          {isLoading ? (
            <div
              style={{ textAlign: "center", margin: "20px" }}
              className="loadingContainer"
            >
              <span className="loadingSpan">Loading... </span>
              <RotateLoader margin="0 auto" color={"#ffff"} size={30} />
            </div>
          ) : page !== null ? (
            <>
              <div className="containerGrid">
                {movies.slice(0, visibleMovies).map((movie) => (
                  <div key={movie.id} className="generalGridSettings">
                    <MovieList movie={movie} />
                  </div>
                ))}
              </div>
              <div className="paginationContainer">
                <div>
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="previousPageButton"
                  >{`<< Previous`}</button>
                </div>
                <div className="loadMoreButton">
                  {visibleMovies < movies.length && (
                    <button onClick={handleLoadMore}>Load More</button>
                  )}
                </div>
                <div className="nextPageButton">
                  <button
                    onClick={handleNextPage}
                    disabled={page === 500}
                  >{`Next >>`}</button>
                </div>
              </div>
            </>
          ) : <>
          <div className="noResultsContainer">
            <p className="noResults"> Something went wrong </p>
          </div>            
        </>}
        </div>
      </div>
    </>
  );
};

export default MovieLists;
