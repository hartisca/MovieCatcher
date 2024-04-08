import ContentWrapper from "../contentWrapper/ContentWrapper"
import "./style.scss"
import { fetchTrendingData } from "../../slices/movies/thunks"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../carousel/Carousel";

const Trending = () => {
  const dispatch = useDispatch();
  const { trending, isLoading } = useSelector((state) => state.movie);
  

  useEffect(() => {
    dispatch(fetchTrendingData())
    console.log(trending)
  }, [dispatch]);

  return (
    <section className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>        
      </ContentWrapper>
      <Carousel trending={ trending } />
    </section>
  )
}

export default Trending