import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../slices/movies/thunks";
import { MovieList } from "./MovieList";
import RotateLoader from "react-spinners/ClipLoader";
import {
  usePreviousPageHandler,
  useNextPageHandler,
} from "../../functions/moviesFuntions";
import SideBar from "../../layout/Sidebar";
import './style.scss';

const MovieLists = () => {
  const [visibleMovies, setVisibleMovies] = useState(6);
  const {
    movies = [],
    isLoading,
    page,
    searchKey,
    selectedGenre,
  } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handlePreviousPage = usePreviousPageHandler();
  const handleNextPage = useNextPageHandler();

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 6);
  };

  useEffect(() => {    
    dispatch(fetchMovies(searchKey, page, selectedGenre));    
  }, [searchKey, page, selectedGenre, dispatch]);

  return (
    <>
      <div className="containerMovieList">
        <div className="stickyNav">
          <SideBar />
        </div>
        <div className="moviesContainer">
          {isLoading ? (
            <div
              style={{ textAlign: "center", margin: "20px" }}
              className="spinner"
            >
              <p>Loading... </p>
              <RotateLoader margin="0 auto" color={"#950101"} size={30} />
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
