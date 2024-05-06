/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import Img from "../../../lazyLoadImage/Img";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import PosterFallBack from "../../../../assets/no-poster.png"
import { Link } from "react-router-dom";
import CircleRating from "../../../circleRating/CircleRating";
import "../../../carousel/style.scss";

const Similar = ({ data }) => {
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
          {data.items.map((item) => {
            const posterUrl = item.poster
              ? URL_IMAGE + item.poster
              : PosterFallBack;
            return (
              <Link key={item.id} className="carouselItem" to={`/${mediaType}/${item.id}`}>
                <div className="posterBlock">
                  <Img src={posterUrl} alt={item.title || item.name} />
                  <CircleRating
                    rating={item.vote_average ? item.vote_average.toFixed(1) : 0}
                  />                                  
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


export default Similar