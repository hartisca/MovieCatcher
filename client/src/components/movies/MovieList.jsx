/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import './style.scss';
import posterFallback from '../../assets/no-poster.png'
import { useSelector } from "react-redux";

export const MovieList = ({ movie, mediaType: mediaTypeProp }) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const backgoundImageStyle = {
    backgroundImage: `url(${movie.poster_path ? URL_IMAGE + movie.poster_path : posterFallback})`,
    objectFit: 'cover',
    objectPosition: 'center',
  };
  const reduxMediaType = useSelector((state) => state.movie.mediaType);

  const mediaType = mediaTypeProp || movie.media_type || reduxMediaType || 'movie';
  return (
    <Link
      to={`/${mediaType}/${movie.id}`}
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
