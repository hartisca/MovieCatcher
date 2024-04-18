/* eslint-disable react/prop-types */
import { renderStarIcons } from "../../functions/moviesFuntions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchKey } from "../../slices/movies/movieSlice";
import './style.scss';

export const MovieList = ({ movie }) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const backgoundImageStyle = {
    backgroundImage: `url(${URL_IMAGE + movie.poster_path})`,
    objectFit: 'cover',
    objectPosition: 'center',
};
  const dispatch = useDispatch();

  const handleMovieClick = () => {
    dispatch(setSearchKey(""));
  };
  
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="movieCardContainer"
      onClick={handleMovieClick}
    >
      <article className="movieCard" style={{ ...backgoundImageStyle }}>
        <div className="movieRatings">
          <p>{movie.title}</p>
          <span>{renderStarIcons(movie.vote_average / 2)}</span>
        </div>
      </article>
    </Link>
  );
};
