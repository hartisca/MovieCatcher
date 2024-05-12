import { GoInfo } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
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
        <div>
          <FaLinkedin className='linkedIn' />
          <a href="https://github.com/hartisca" aria-label="github link" aria-roledescription="link" target="_blank" rel="noreferrer"><FaGithubSquare className='github' /></a>
        </div>
        
      </div>
    </footer>
         
    </>
  )
}

export default Footer