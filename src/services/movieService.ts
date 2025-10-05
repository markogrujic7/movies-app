import axios from "axios";

export interface Movie {
  id?: number;
  name: string;
  hall: number;
  price: number;
  likes?: number;
  dislikes?: number;
  poster: string;
}

const API_URL = "http://localhost:5111/api/movies";

export const getMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<Movie[]>(API_URL);
  return response.data;
};

export const getMovie = async (id: number): Promise<Movie> => {
  const response = await axios.get<Movie>(`${API_URL}/${id}`);
  return response.data;
};

export const createMovie = async (movie: Movie): Promise<Movie> => {
  const response = await axios.post<Movie>(API_URL, movie);
  return response.data;
};

export const updateMovie = async (movie: Movie): Promise<Movie> => {
  if (!movie.id) throw new Error("Movie ID is required for update");
  const response = await axios.put<Movie>(`${API_URL}/${movie.id}`, movie);
  return response.data;
};

export const deleteMovie = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const likeMovie = async (id: number): Promise<void> => {
  await axios.put(`${API_URL}/${id}/like`);
};

export const dislikeMovie = async (id: number): Promise<void> => {
  await axios.put(`${API_URL}/${id}/dislike`);
};
