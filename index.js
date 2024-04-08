const PORT = 8000;
import express from "express";
import cors from "cors";

const app = express();
process.loadEnvFile();

app.use(cors());

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

app.get("/", (req, res) => {
  res.json("Welcome to the Movie API!");
});

app.get("/movies", async (req, res) => {
  try {
    const { page, searchKey, selectedGenre } = req.query;

    let url;
    let queryParams = {
      api_key: API_KEY,
    };

    if (selectedGenre !== "null" && selectedGenre !== "") {
      queryParams.with_genres = selectedGenre;
    }

    if (searchKey) {
      url = `${API_URL}/search/movie?query=${searchKey}&api_key=${API_KEY}`;
    } else {
      queryParams.page = page;
      url = `${API_URL}/discover/movie?${new URLSearchParams(
        queryParams
      ).toString()}`;
    }

    console.log("URL final:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results;
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let queryParams = {
      api_key: API_KEY,
      append_to_response: "videos",
    };

    const url = `${API_URL}/movie/${id}?${new URLSearchParams(
      queryParams
    ).toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching movie: ${response.statusText}`);
    }

    const data = await response.json();
    const { imdb_id, title, overview, poster_path, vote_average } = data;

    let trailer = null;
    if (data.videos && data.videos.results) {
      trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
    }

    const streamingUrl = `https://streaming-availability.p.rapidapi.com/get?tmdb_id=movie/${id}`;
    const streamingOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_HOST,
      },
    };
    const streamingResponse = await fetch(streamingUrl, streamingOptions);
    const streamingData = await streamingResponse.json();

    const movieData = {
      id,
      imdb_id,
      title,
      overview,
      poster: poster_path,
      vote_average,
      trailer,
      streamingInfo: streamingData.result.streamingInfo.es,
    };

    res.json(movieData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/movies/upcoming", async (req, res) => {
  try {
    let queryParams = {
      api_key: API_KEY,
    };

    const url = `${API_URL}/movie/upcoming?${new URLSearchParams(
      queryParams
    ).toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results;
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/trending/all", async (req, res) => {
  try {
    let queryParams = {
      api_key: API_KEY,
    };

    const url = `${API_URL}/trending/all/day?${new URLSearchParams(
      queryParams
    ).toString()}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results;
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => console.log(`Server running on port ${PORT}`));
