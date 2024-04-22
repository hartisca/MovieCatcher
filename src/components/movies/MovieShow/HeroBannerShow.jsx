import { useState } from 'react'
import { useSelector } from 'react-redux'
import "./style.scss"
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import Img from '../../lazyLoadImage/Img'
import dayjs from "dayjs";
import CircleRating from "../../circleRating/CircleRating"
import posterFallBack from "../../../assets/no-poster.png"
import Youtube from 'react-youtube';
import { FaYoutube } from "react-icons/fa";
import hbo from "../../../img/hbo.png";
import netflix from "../../../img/netflix.png";
import prime from "../../../img/prime.png";
import disney from "../../../img/disneyplus.png";
import apple from "../../../img/apple.png";

const HeroBannerShow = () => {
  
  const { movie, video, streamingInfo } = useSelector((state) => state.movie);
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';  
  let [showModal, setShowModal] = useState(false);
  const uniqueServices = streamingInfo ? new Set(streamingInfo.map(service => service.service)) : new Set();
  const trailer = video && video.key ? video.key : null;
 
  const serviceIcons = {
    hbo,
    netflix,
    prime,
    disney,
    apple
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="heroBannerContainer">
      <div className="backdrop-img">
        <Img
          className="backdrop-img__img"
          src={URL_IMAGE + movie.backdrop_path}
          alt={`Promotional Image for the movie ${movie.title}`}
        />
      </div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className='movieShowContent'>
          <div className='leftContent'>
          {movie.poster ? (
            <Img
              className="posterImg"
              src={
                URL_IMAGE + movie.poster
              }
            />
        ) : (
          <Img
            className="posterImg"
            src={posterFallBack}
          />
        )}
        </div>
        <div className='rightContent'>
          <h3 className="title">
            {`${
              movie.name || movie.title
            } (${dayjs(
              movie?.release_date
            ).format("YYYY")})`}
          </h3>
          <h5 className="subtitle">
            {movie.tagline}
          </h5>
          <div className='genresMovieShow'>
            {movie.genres && movie.genres.map(genre => (
              <span className='genreMovieShowTag' key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <div className='rowMovieShowContent'>
          <CircleRating
            rating={movie.vote_average ? movie.vote_average.toFixed(1) : 0}
          />          
          <div>
            <div className="youtube-icon" 
              onClick={trailer ? handleOpenModal : null}
              style={{ cursor: trailer ? 'pointer' : 'default', color: trailer ? '#FF0000' : 'grey' }}>
                <FaYoutube /> <span className='trailerText'>{ trailer ? 'Watch Trailer' : 'We couldn\'t find the trailer' }</span>
              </div>
              {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <Youtube videoId={trailer} /> 
                    <button className="close-button" onClick={handleCloseModal}>Close</button>
                  </div>
                </div>
              )}              
            </div>            
          </div>
          <div className="overview">
            <h5 className="heading">
              Overview
            </h5>
            <div className="description">
              {movie.overview}
            </div>
          </div>
          <div className="overview">
            <h5 className="heading">
              Watch on
            </h5>
            {streamingInfo && streamingInfo.length > 0 ? (
              <div className="streamingIconsContainer">
                {Array.from(uniqueServices).map(service => (
                  serviceIcons[service] && (
                    <img
                      key={service}
                      src={serviceIcons[service]}
                      alt={`${service} icon`}
                      className='streamingIcon'
                    />
                  )
                ))}
              </div>
              ) : (
                <p>Not available on streaming services</p>
              )}              
          </div>
        </div>
        </div>
      </ContentWrapper>
    </section>      
    </>    
  )
}

export default HeroBannerShow