/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import './style.scss';
import posterFallback from '../../assets/no-poster.png'

export const MovieList = ({ movie }) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const backgoundImageStyle = {
    backgroundImage: `url(${movie.poster_path ? URL_IMAGE + movie.poster_path : posterFallback})`,
    objectFit: 'cover',
    objectPosition: 'center',
  };
    
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
