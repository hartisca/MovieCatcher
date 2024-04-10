import ContentWrapper from "../contentWrapper/ContentWrapper"
import "./style.scss"
import { fetchTrendingData } from "../../slices/movies/thunks"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../carousel/Carousel";

const Trending = () => {
  const dispatch = useDispatch();
  const { trending } = useSelector((state) => state.movie);
  

  useEffect(() => {
    dispatch(fetchTrendingData())    
  }, [dispatch]);

  return (
    <section className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending Movies</span>        
      </ContentWrapper>
      <Carousel data={ trending } />
    </section>
  )
}

export default Trending