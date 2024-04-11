import { Routes, Route } from "react-router-dom";
import MovieLists from "./components/movies/MovieLists";
import { MovieShow } from "./components/movies/MovieShow";
import SearchResult from "./pages/SearchResult";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";


const Rutas = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/discover" element={<MovieLists />}></Route>    
    <Route path="/:mediaType/:id" element={<MovieShow />}></Route>
    <Route path="/search/:query" element={<SearchResult />}></Route>
    <Route path="*" element={<PageNotFound />}></Route>
  </Routes>
);

export default Rutas;
