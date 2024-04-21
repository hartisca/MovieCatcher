import { useDispatch } from "react-redux";
import { setGenre } from "../slices/movies/movieSlice";
import { useState } from "react";
import { GenreList } from "../assets/GenreList";
const Genres = () =>{
  const [selected, setSelected] = useState(null);  
  const dispatch = useDispatch();  

  const handleGenreSelect = (genre) => {
    dispatch(setGenre(genre));
    setSelected(genre);
  } 

  

  return(
    <>    
    <nav className='sideBarGenres'>
        {GenreList.map((genre) => (
          <div
            key={genre.id}
            className={`${selected === genre.id ? "selectedTag" : "genreTag"}`}
            onClick={() => handleGenreSelect(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </nav>
    </>
  )
}

export default Genres;