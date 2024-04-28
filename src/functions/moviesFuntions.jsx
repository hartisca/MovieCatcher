import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setPage } from '../slices/movies/movieSlice';

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