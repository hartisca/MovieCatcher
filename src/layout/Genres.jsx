import { useDispatch } from "react-redux";
import { setGenre } from "../slices/movies/movieSlice";
import { useState } from "react";

const Genres = () =>{
  const [selected, setSelected] = useState(null);  
  const dispatch = useDispatch();  

  const handleGenreSelect = (genre) => {
    dispatch(setGenre(genre));
    setSelected(genre);
  } 

  const genres = [
    { id: null, name: "All" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mistery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "Tv Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];

  return(
    <>    
    <nav className='sideBarGenres'>
        {genres.map((genre) => (
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