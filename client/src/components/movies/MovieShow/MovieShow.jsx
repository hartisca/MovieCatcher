import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchMovieAction } from "../../../slices/movies/thunks";
import { useParams } from 'react-router-dom';
import RotateLoader from "react-spinners/ClipLoader";
import HeroBannerShow from "./HeroBannerShow";
import avatar from "../../../assets/avatar.png";
import Img from "../../lazyLoadImage/Img";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import Similar from "./carousels/Similar";


import './style.scss';

export const MovieShow = () => {

  const { mediaType, id } = useParams();
  const { movie, isLoading, similar } = useSelector((state) => state.movie);
  const dispatch = useDispatch();  
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  const carouselData = {
    title: title,
    items: similar
  };
  
  useEffect(() => {
    dispatch(fetchMovieAction(id, mediaType));    
  }, [id]);

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
      <ContentWrapper>
      <section className="castContainer">
        <div>
          <h5 className="heading">Director</h5>
          <Img src={movie.directorProfilePath? URL_IMAGE + movie.directorProfilePath : avatar} alt={`Profile picture of director ${movie.directorName}`}   />
          <p className="directorName">{movie.directorName}</p>
        </div>
        <div>
          <h5 className="heading">Top Cast</h5>          
          {movie.cast && movie.cast.length > 0 && (
            <section className="castSection">
              {movie.cast.map((actor, index) => (
                <div key={index}>
                  <Img src={actor.profile_path ? URL_IMAGE + actor.profile_path : avatar} alt={`Profile picture of ${actor.name}`} />
                  <p className="actorName">{actor.name}</p>
                </div>
              ))}
            </section>
          )}         
        </div>
      </section>
      </ContentWrapper>
      <section className="carouselSection">
        <Similar data={carouselData} loading={isLoading} />
      </section>              
    </section>
    )}      
    </>
  )
}
