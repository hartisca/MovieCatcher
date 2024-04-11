const PORT = 8000;
import express from "express";
import cors from "cors";

const app = express();
process.loadEnvFile();

app.use(cors());

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

app.get("/home/:mediaType", async (req, res) => {
  try {
    const { mediaType } = req.params; // Recuperar el parámetro mediaType de la URL

    // Lógica para construir las URLs basadas en el valor de mediaType
    let trendingUrl, topRatedUrl;
    if (mediaType === 'movie') {
      trendingUrl = `${API_URL}/trending/movie/day?api_key=${API_KEY}`;
      topRatedUrl = `${API_URL}/movie/top_rated?api_key=${API_KEY}`;
    } else if (mediaType === 'tv') {
      trendingUrl = `${API_URL}/trending/tv/day?api_key=${API_KEY}`;
      topRatedUrl = `${API_URL}/tv/top_rated?api_key=${API_KEY}`;
    } else {
      throw new Error('Invalid mediaType');
    }

    const trendingResponse = await fetch(trendingUrl);
    const topRatedResponse = await fetch(topRatedUrl);

    if (!trendingResponse.ok || !topRatedResponse.ok) {
      throw new Error(
        `Error fetching data: ${
          trendingResponse.statusText || topRatedResponse.statusText
        }`
      );
    }

    const trendingData = await trendingResponse.json();
    const topRatedData = await topRatedResponse.json();

    const trendingResults = trendingData.results;
    const topRatedResults = topRatedData.results;

    res.json({ trending: trendingResults, topRated: topRatedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/discover", async (req, res) => {
  try {
    const { page, searchKey, selectedGenre, mediaType } = req.query;
    console.log(mediaType)
    let url;
    let queryParams = {
      api_key: API_KEY,
    };

    if (selectedGenre !== "null" && selectedGenre !== "") {
      queryParams.with_genres = selectedGenre;
    }

    if (searchKey) {
      url = `${API_URL}/search/${mediaType}?query=${searchKey}&api_key=${API_KEY}`;
    } else {
      queryParams.page = page;
      url = `${API_URL}/discover/${mediaType}?${new URLSearchParams(
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

app.get("/:mediaType/:id", async (req, res) => {
  try {
    const { mediaType, id } = req.params;

    let queryParams = {
      api_key: API_KEY,
      append_to_response: "videos",
    };

    const url = `${API_URL}/${mediaType}/${id}?${new URLSearchParams(
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

    const streamingUrl = `https://streaming-availability.p.rapidapi.com/get?tmdb_id=${mediaType}/${id}`;
    const streamingOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_HOST,
      },
    };
    const streamingResponse = await fetch(streamingUrl, streamingOptions);
    const streamingData = await streamingResponse.json();
    let streamingInfo = [];

    if (streamingData.result && streamingData.result.streamingInfo && streamingData.result.streamingInfo.es) {
    streamingInfo = streamingData.result.streamingInfo.es;
}

    const movieData = {
      id,
      imdb_id,
      title,
      overview,
      poster: poster_path,
      vote_average,
      trailer,
      streamingInfo
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
    console.log(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.listen(8000, () => console.log(`Server running on port ${PORT}`));
