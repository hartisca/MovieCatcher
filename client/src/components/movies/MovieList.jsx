/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './style.scss';

export const MovieList = ({ movie }) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const backgoundImageStyle = {
    backgroundImage: `url(${URL_IMAGE + movie.poster_path})`,
    objectFit: 'cover',
    objectPosition: 'center',
  };
  const { mediaType } = useSelector((state) => state.movie)  
  
  return (
    <Link
      to={`/${movie.media_type}/${movie.id}`}
      className="movieCardContainer"
      
    >
      <article className="movieCard" style={{ ...backgoundImageStyle }}>
        <div className="movieRatings">
          <p>{movie.title? movie.title : movie.name}</p>          
        </div>
      </article>
    </Link>
  );
};
