import Trending from "../components/movies/Trending"
import HeroBanner from "../layout/HeroBanner/HeroBanner"
import './style.scss'

const Home = () => {

  return (
    <>      
      <div className="homeContainer">
        <HeroBanner />
        <Trending />
      </div>
    </>
  );
};

export default Home