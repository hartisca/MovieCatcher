import { Routes, Route } from "react-router-dom";
import MovieLists from "./components/movies/MovieLists";
import { MovieShow } from "./components/movies/MovieShow/MovieShow";
import PageNotFound from "./pages/404/PageNotFound";
import Home from "./pages/Home";
import Search from "./pages/Search"

const Rutas = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/discover" element={<MovieLists />}></Route>    
    <Route path="/:mediaType/:id" element={<MovieShow />}></Route>
    <Route path="/search/:query" element={<Search />}></Route>
    <Route path="*" element={<PageNotFound />}></Route>
  </Routes>
);

export default Rutas;
