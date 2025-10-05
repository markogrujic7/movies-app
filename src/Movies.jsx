import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovie, likeMovie, dislikeMovie } from "./services/movieService";

const Movies = ({ movies, setMovies, setEditingMovie }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deleteMovie(id);
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    navigate("/movieForm");
  };

  const handleLike = async (id) => {
    await likeMovie(id);
    setMovies(prev => prev.map(m => m.id === id ? { ...m, likes: (m.likes || 0) + 1 } : m));
  };

  const handleDislike = async (id) => {
    await dislikeMovie(id);
    setMovies(prev => prev.map(m => m.id === id ? { ...m, dislikes: (m.dislikes || 0) + 1 } : m));
  };

  return (
    <div>
      <h2>Movies</h2>
      <button onClick={() => navigate("/movieForm")}>Add Movie</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img src={movie.poster} alt={movie.name} style={{ width: "100%" }} />
            <h3>{movie.name}</h3>
            <p>Hall: {movie.hall}</p>
            <p>Price: {movie.price}</p>
            <p>Likes: {movie.likes || 0} | Dislikes: {movie.dislikes || 0}</p>
            <button onClick={() => handleLike(movie.id)}>Like</button>
            <button onClick={() => handleDislike(movie.id)}>Dislike</button>
            <button onClick={() => handleEdit(movie)}>Edit</button>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
