import ContentWrapper from "../contentWrapper/ContentWrapper"
import "./style.scss"
import { fetchHomeData } from "../../slices/movies/thunks"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../carousel/Carousel";

const Trending = () => {
  const dispatch = useDispatch();
  const { trending, topRated } = useSelector((state) => state.movie);  

  useEffect(() => {
    dispatch(fetchHomeData())    
  }, [dispatch]);

  return (
    <section className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending Movies</span>        
      </ContentWrapper>
      <Carousel data={ trending } />
      <ContentWrapper>
        <span className="carouselTitle">Popular Movies</span>        
      </ContentWrapper>
      <Carousel data={ topRated } />
    </section>
  )
}

export default Trending