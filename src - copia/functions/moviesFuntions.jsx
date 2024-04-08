import { CiStar } from "react-icons/ci";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setPage } from '../slices/movies/movieSlice';

export const renderStarIcons = (rating) => {
  const stars = [];
  const roundedRating = Math.floor(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} />);
    } else if (i === roundedRating + 1 && rating % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<CiStar key={i} />);
    }
  }

  return (
    <div>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};


export const usePreviousPageHandler = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movie.page);
  
  const handlePreviousPage = () => {
    const prevPage = page - 1;
    dispatch(setPage(prevPage));
  };

  return handlePreviousPage;
};

export const useNextPageHandler = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movie.page);
  
  const handleNextPage = () => {
    const nextPage = page + 1;

    dispatch(setPage(nextPage));
  };

  return handleNextPage;
};