/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchKey } from "../../slices/movies/movieSlice";
import './style.scss';

export const MovieList = ({ movie }) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const backgoundImageStyle = {
    backgroundImage: `url(${URL_IMAGE + movie.poster_path})`,
    objectFit: 'cover',
    objectPosition: 'center',
  };
  const { mediaType } = useSelector((state) => state.movie)
  const dispatch = useDispatch();  
  const handleMovieClick = () => {
    dispatch(setSearchKey(""));    
  };
  
  return (
    <Link
      to={`/${mediaType}/${movie.id}`}
      className="movieCardContainer"
      onClick={handleMovieClick}
    >
      <article className="movieCard" style={{ ...backgoundImageStyle }}>
        <div className="movieRatings">
          <p>{movie.title}</p>          
        </div>
      </article>
    </Link>
  );
};
