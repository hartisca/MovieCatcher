import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieUpComing } from "../../slices/movies/thunks";
import './HeroBanner.scss'
import Img from "../../components/lazyLoadImage/Img";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { IoSearchSharp } from "react-icons/io5";
import { fetchMovies } from "../../slices/movies/thunks";
import { setSearchKey, setPage } from "../../slices/movies/movieSlice";

const HeroBanner = () => {
  const { upcoming = [], searchKey, page } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [ background, setBackground ] = useState("");  
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const [ localSearchKey, setLocalSearchKey ] = useState('');
  const [ searchPerformed, setSearchPerformed ] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieUpComing());
  }, [dispatch]);

  useEffect(() => {
    if (upcoming.length > 0) {
      const randomIndex = Math.floor(Math.random() * upcoming.length);
      const bg = URL_IMAGE + upcoming[randomIndex].backdrop_path;
      setBackground(bg);
    }
  }, [upcoming]);

  const handleSearchChange = (e) => {
    setLocalSearchKey(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchKey(localSearchKey));
    setSearchPerformed(true); 
    if (searchKey === "") {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      dispatch(setPage(randomPage));
    }
  }; 

  useEffect(() => {
    if (searchPerformed && searchKey !== null) { 
      dispatch(fetchMovies(searchKey, page));      
    }
  }, [searchKey, page, dispatch, searchPerformed]); 

  return (
    <section className="heroBanner">
      <div className="backdrop-img">
        <Img src={background} />
      </div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="titleBanner">Welcome to <span className="titleSpan">MovieCatcher</span></span>
            <span className="subtitleBanner">
              Find information on any movie or TV series and find out on which
              streaming platform you can watch it.
            </span>
            <div className="searchInput">
              <form onSubmit={handleSearchSubmit} className="searchForm">
                <input
                  type="text"
                  placeholder="Search for any movie or Tv show..."
                  value={localSearchKey}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="botonBanner">
                  <IoSearchSharp className="iconoLupa" /> Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default HeroBanner;
