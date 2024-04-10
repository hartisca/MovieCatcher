import  logo  from "../../img/Logo.png"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMediaType } from "../../slices/movies/movieSlice";

const Header = () => {  
  
  const mediaType = useSelector(state => state.movie.mediaType);
  const dispatch = useDispatch();

  const handleMediaTypeClick = (type) => {
    dispatch(setMediaType(type));
  };
  
  return (
    <>
      <nav className="generalHeader">
        <Link to={"/"} className="logo">
          <img src={logo} alt="MovieCatcher Logo" width="150px"/>
        </Link>
        <ul className="menuItems">
          <li className={`menuItem ${mediaType === 'movie' ? 'active' : ''}`} onClick={() => handleMediaTypeClick('movie')}>Movies</li>
          <li className={`menuItem ${mediaType === 'tv' ? 'active' : ''}`} onClick={() => handleMediaTypeClick('tv')}>Tv Shows</li>          
        </ul>
      </nav>      
    </>
  );
};

export default Header;
