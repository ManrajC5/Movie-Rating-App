import React from "react";

function MovieCard({ title, releaseDate, rating, poster }) {
  return (
    <div className="movie_card">
      <img src={poster} alt={title} />
      <div className="movie_info">
        <h3>{title}</h3>
        <p>Release Date: {releaseDate || "N/A"}</p>
        {rating ? <p>Rating: {rating}</p> : null}
      </div>
    </div>
  );
}

export default MovieCard;
