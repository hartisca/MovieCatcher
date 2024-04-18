import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchMovieAction } from "../../../slices/movies/thunks";
import { useParams, useNavigate } from 'react-router-dom';
import { renderStarIcons } from "../../../functions/moviesFuntions";
import RotateLoader from "react-spinners/ClipLoader";
import HeroBannerShow from "./HeroBannerShow";
import { FaYoutube } from "react-icons/fa";
import Youtube from 'react-youtube';
import './style.scss';
import hbo from "../../../img/hbo.png";
import netflix from "../../../img/netflix.png";
import prime from "../../../img/prime.png";
import disney from "../../../img/disneyplus.png";
import apple from "../../../img/apple.png";

const serviceIcons = {
  hbo,
  netflix,
  prime,
  disney,
  apple
};

export const MovieShow = () => {
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
  const { id } = useParams();
  const { movie, streamingInfo, video, searchKey, mediaType, isLoading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  let [showModal, setShowModal] = useState(false);
  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  useEffect(() => {
    dispatch(fetchMovieAction(id, mediaType));    
  }, [id]);

  useEffect(() => {    
    if (searchKey && searchKey !== movie.searchKey) { 
      navigate('/');
    }
  }, [searchKey, movie.searchKey, navigate]);

  const uniqueServices = streamingInfo ? new Set(streamingInfo.map(service => service.service)) : new Set();
  const trailer = video && video.key ? video.key : null;
  
  return (
    <>
    {isLoading?  (
    <div
      style={{ textAlign: "center", margin: "20px" }}
      className="loadingContainer"
    >
      <span className="loadingSpan">Loading... </span>
      <RotateLoader margin="0 auto" color={"#ffff"} size={30} />
    </div>
    ):(
    <section>
    <HeroBannerShow /> 
    <div className='movieBigContainer'>
      <div className='titleBigCard'>
        <h4 >{movie.title}</h4>
      </div>      
      <div className='movieBigCard'>
        <div className='imgCard'>
          <img src={URL_IMAGE + movie.poster} alt={`Promotional image for the movie ${movie.title}`} width='300px' />
        </div>
        <div className='textCard'>          
          <p className='bigCardText'>{movie.overview}</p>
          <div className='streamInfoContainer'>
            <div>
              <div>
                <div className="youtube-icon" 
                onClick={trailer ? handleOpenModal : null}
                style={{ cursor: trailer ? 'pointer' : 'default', color: trailer ? '#FF0000' : 'grey' }}>
                  <FaYoutube />
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
              <span className='starColors'>Rating: {renderStarIcons(movie.vote_average / 2)}</span>              
            </div>
              <fieldset className='fieldSet'>
                <legend>Watch On</legend>
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
                  <div>Not available on streaming services</div>
                )}
              </fieldset>
              </div>          
            </div>
          </div>      
        </div>
        </section>
        )}      
    </>
  )
}
