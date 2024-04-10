import ContentWrapper from "../contentWrapper/ContentWrapper"
import "./style.scss"
import { fetchTopRatedMovies } from "../../slices/movies/thunks"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../carousel/Carousel";

const TopRated = () => {
  const dispatch = useDispatch();
  const { topRated } = useSelector((state) => state.movie);
  

  useEffect(() => {
    dispatch(fetchTopRatedMovies())    
  }, [dispatch]);

  return (
    <section className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Popular Movies</span>        
      </ContentWrapper>
      <Carousel data={ topRated } />
    </section>
  )
}

export default TopRated