import { Routes, Route } from "react-router-dom";
import MovieLists from "./components/movies/MovieLists";
import { MovieShow } from "./components/movies/MovieShow";
import Details from "./pages/Details";
import SearchResult from "./pages/SearchResult";
import PageNotFound from "./pages/PageNotFound";

const Rutas = () => (
  <Routes>
    <Route path="/" element={MovieLists}></Route>
    <Route path="/movies" element={<MovieLists />}></Route>
    <Route path="/movies/:id" element={<MovieShow />} />
    <Route path="/:mediaType/:id" element={<Details />}></Route>
    <Route path="/search/:query" element={<SearchResult />}></Route>
    <Route path="*" element={<PageNotFound />}></Route>
  </Routes>
);

export default Rutas;
