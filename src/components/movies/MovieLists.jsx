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

const MovieLists = () => {
  const [visibleMovies, setVisibleMovies] = useState(8);
  const {
    movies = [],
    isLoading,
    page,
    searchKey,
    selectedGenre,
    mediaType
  } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handlePreviousPage = usePreviousPageHandler();
  const handleNextPage = useNextPageHandler();

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 8);
  };

  useEffect(() => {    
    dispatch(fetchMovies(searchKey, page, selectedGenre, mediaType));    
  }, [searchKey, page, selectedGenre, mediaType, dispatch]);

  return (
    <>
      <div className="containerMovieList">
        <div className="stickyNav">
          <Genres />
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
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default MovieLists;
