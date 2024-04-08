import { useState } from "react";
import  logo  from "../../img/Logo.png"
import { Link } from "react-router-dom";
const Header = () => {  
  const [ show, setShow ] = useState("top")
  const [ lastScrollY, setLastScrollY ] = useState(0)
  const [ mobileMenu, setMobileMenu ] = useState(false)
  
  return (
    <>
      <nav className="generalHeader">
        <Link to={"/"} className="logo">
          <img src={logo} alt="MovieCatcher Logo" width="150px"/>
        </Link>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">Tv Shows</li>          
        </ul>
      </nav>      
    </>
  );
};

export default Header;
