import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./style.scss"
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import Img from '../../lazyLoadImage/Img'
import dayjs from "dayjs";
import CircleRating from "../../circleRating/CircleRating"

const HeroBannerShow = () => {
  const { movie, video } = useSelector((state) => state.movie);
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';  

  return (
    <>
      <div className="heroBannerContainer">
      <div className="backdrop-img">
        <Img
          className="backdrop-img__img"
          src={URL_IMAGE + movie.backdrop_path}
          alt={`Promotional Image for the movie ${movie.title}`}
        />
        
      </div>
      <div className="opacity-layer"></div>
    </div>
      
    </>
    
  )
}

export default HeroBannerShow