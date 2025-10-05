import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import MovieForm from "./MovieForm";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Home from "./Home";
import './styles.css';
import { getMovies, createMovie, updateMovie } from "./services/movieService";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [bestMovie, setBestMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Ne mogu da učitam filmove:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) {
      setBestMovie(null);
      return;
    }
    const sorted = [...movies].sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    setBestMovie(sorted[0]);
  }, [movies]);

  const addOrUpdateMovie = async (movieData) => {
    try {
      if (!editingMovie) {
        const newMovie = {
          name: movieData.name,
          hall: Number(movieData.theater),
          price: Number(movieData.price),
          poster: movieData.img || "https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg",
        };
        const created = await createMovie(newMovie);
        setMovies(prev => [...prev, created]);
      } else {
        const updatedMovie = {
          id: editingMovie.id,
          name: movieData.name,
          hall: Number(movieData.theater),
          price: Number(movieData.price),
          poster: movieData.img || editingMovie.poster,
          likes: editingMovie.likes,
          dislikes: editingMovie.dislikes
        };
        const updated = await updateMovie(updatedMovie);
        setMovies(prev => prev.map(m => m.id === updated.id ? updated : m));
        setEditingMovie(null);
      }
    } catch (error) {
      console.error("Greška pri čuvanju filma:", error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {bestMovie && (
          <div className="best-movie">
            <h2>Najbolje ocenjeni film</h2>
            <img src={bestMovie.poster} alt={bestMovie.name} style={{ width: "150px" }} />
            <h3>{bestMovie.name}</h3>
            <p>Likes: {bestMovie.likes} | Dislikes: {bestMovie.dislikes}</p>
          </div>
        )}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/movies"
            element={
              <Movies
                movies={movies}
                setMovies={setMovies}
                setEditingMovie={setEditingMovie}
              />
            }
          />
          <Route
            path="/movieForm"
            element={
              <MovieForm
                onAdd={addOrUpdateMovie}
                editingMovie={editingMovie}
                onCancelEdit={() => setEditingMovie(null)}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
