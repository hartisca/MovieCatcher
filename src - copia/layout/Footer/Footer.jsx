import { GoInfo } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {

  return(
    <>
      <hr className='footerBar' />
      <div className='footerInfoContainer'>
        <div className='footerInfo'>
          <GoInfo  />
          <p className='footerText'>Educational project, movie data provided by TMDB and Streaming availability API.</p>
        </div>
        <FaLinkedin className='linkedIn' />
      </div>      
    </>
  )
}

export default Footer