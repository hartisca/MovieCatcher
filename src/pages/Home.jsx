import Trending from "../components/movies/Trending"
import HeroBanner from "../layout/HeroBanner/HeroBanner"

const Home = () => { 
  return (
    <>      
      <div>
        <HeroBanner />
        <Trending />
      </div>
    </>
  );
};

export default Home