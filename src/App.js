import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = "a75f185e68cae04a6d218be886d02a01";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [currentPage, searchQuery, sortOption]);

  const fetchMovies = async () => {
    let endpoint = "";

    if (searchQuery) {
      endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        searchQuery
      )}&page=${currentPage}`;
    } else {
      const sortBy = sortOption || "popularity.desc";
      endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&page=${currentPage}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.trim());
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Movie Explorer</h1>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="release_date.asc">Release Date (Asc)</option>
          <option value="release_date.desc">Release Date (Desc)</option>
          <option value="vote_average.asc">Rating (Asc)</option>
          <option value="vote_average.desc">Rating (Desc)</option>
        </select>
      </div>

      <main>
        <div id="movieContainer" className="movie_grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                poster={
                  movie.poster_path
                    ? `${IMG_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
              />
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
              No movies found.
            </p>
          )}
        </div>
      </main>

      <footer>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span id="page_number">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </footer>
    </div>
  );
}

export default App;
