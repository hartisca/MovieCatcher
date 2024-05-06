import { GoInfo } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import './style.scss';

const Footer = () => {

  return(
    <>
    <footer className="footerContainer">
      <hr className='footerBar' />
      <div className='footerInfoContainer'>
        <div className='footerInfo'>
          <GoInfo  />
          <p className='footerText'>Educational project, movie data provided by TMDB and Streaming availability API.</p>
        </div>
        <FaLinkedin className='linkedIn' />
      </div>
    </footer>
         
    </>
  )
}

export default Footer