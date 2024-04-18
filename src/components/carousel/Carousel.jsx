/* eslint-disable react/prop-types */
import "./style.scss"

import { useRef } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img"
import PosterFallBack from "../../assets/no-poster.png"
import CircleRating from "../circleRating/CircleRating";
import { useSelector } from "react-redux";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Carousel = ({data}) => {
  const carouselContainer = useRef();
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const { mediaType } = useSelector((state) => state.movie);

return (
  <div className="carousel">
    <ContentWrapper>
      <div className="carouselTitle">{data.title}</div>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
        <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")} />        
        <div className="carouselItems" ref={carouselContainer}>
          {data?.map((item) => {
            const posterUrl = item.poster_path
              ? URL_IMAGE + item.poster_path
              : PosterFallBack;
            return (
              <Link key={item.id} className="carouselItem" to={`/${mediaType}/${item.id}`}>
                <div className="posterBlock">
                  <Img src={posterUrl} />
                  <CircleRating rating={item.vote_average.toFixed(1)} />                                  
                </div>
                <div className="textBlock">
                  <span className="title">
                    {item.title || item.name}
                  </span>                                 
                </div>
              </Link>
            );
          })}
      </div>        
    </ContentWrapper>
  </div>
);
};


export default Carousel