import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchMovieAction } from "../../../slices/movies/thunks";
import { useParams, useNavigate } from 'react-router-dom';
import RotateLoader from "react-spinners/ClipLoader";
import HeroBannerShow from "./HeroBannerShow";
import './style.scss';

export const MovieShow = () => {
  
  const { id } = useParams();
  const { movie, searchKey, mediaType, isLoading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();  
  const navigate = useNavigate();
 
  useEffect(() => {
    dispatch(fetchMovieAction(id, mediaType));    
  }, [id]);

  useEffect(() => {    
    if (searchKey && searchKey !== movie.searchKey) { 
      navigate('/');
    }
  }, [searchKey, movie.searchKey, navigate]);

  
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
              
    </section>
        )}      
    </>
  )
}
