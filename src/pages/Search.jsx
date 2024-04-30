import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import HeroBanner from "../layout/HeroBanner/HeroBanner"
import { RotateLoader } from "react-spinners"
import { MovieList } from "../components/movies/MovieList"
import { useParams } from "react-router-dom"
import { fetchSearch } from "../slices/movies/thunks"

const Search = () => {
  const [visibleMovies, setVisibleMovies] = useState(8);
  const [ page, setPage ] = useState(1);
  const { search, isLoading } = useSelector((state) => state.movie);
  const { query: urlQuery } = useParams();
  const dispatch = useDispatch();
  const query = urlQuery || "";
  
  const maxPages = Math.ceil(search.length / 8);

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 8);
  };

  useEffect(() => {
    dispatch(fetchSearch(query, page))
  }, [query, page, dispatch]);

  
  return (
    <>
    <HeroBanner />
    <div className="moviesContainer">
          {isLoading ? (
            <div
              style={{ textAlign: "center", margin: "20px" }}
              className="loadingContainer"
            >
              <span className="loadingSpan">Loading... </span>
              <RotateLoader margin="0 auto" color={"#ffff"} size={30} />
            </div>
          ) : search.length > 0 ? (
            <>
              <div className="containerGrid">
                {search.slice(0, visibleMovies).map((movie) => (
                  <div key={movie.id} className="generalGridSettings">
                    <MovieList movie={movie} />
                  </div>
                ))}
              </div>
              <div className="paginationContainer">
                <div>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >{`<< Previous`}</button>
                </div>
                <div className="loadMoreButton">
                  {visibleMovies < search.length && (
                    <button onClick={handleLoadMore}>Load More</button>
                  )}
                </div>
                <div className="nextPageButton">
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === maxPages} 
                >{`Next >>`}</button>
                </div>
              </div>
            </>
          ) : 
          <>
            <div className="noResultsContainer">
              <p className="noResults"> No results found. </p>
            </div>            
          </>
          }
        </div>      
    </>
  )
}

export default Search