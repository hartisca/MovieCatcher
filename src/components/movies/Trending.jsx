import ContentWrapper from "../contentWrapper/ContentWrapper"
import "./style.scss"
import { fetchHomeData } from "../../slices/movies/thunks"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../carousel/Carousel";

const Trending = () => {
  const dispatch = useDispatch();
  const { trending, topRated, mediaType } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchHomeData(mediaType))    
  }, [dispatch, mediaType]);

  return (
    <section className="carouselSection">
    <ContentWrapper>
      <span className="carouselTitle">{mediaType === 'movie' ? 'Trending Movies' : 'Trending TV Shows'}</span>        
    </ContentWrapper>
    <Carousel data={ trending } />
    <ContentWrapper>
      <span className="carouselTitle">{mediaType === 'movie' ? 'Top Rated Movies' : 'Top Rated TV Shows'}</span>        
    </ContentWrapper>
    <Carousel data={ topRated } />
    <button className="discoverMoreButton">Discover More {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</button>
  </section>
  )
}

export default Trending