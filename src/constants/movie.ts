import { MovieSort } from "../types/movie";

export const MOVIE_GENRES = ["All", "Documentary", "Comedy", "Horror", "Crime"];
export const DEFAULT_MOVIE_GENRE = MOVIE_GENRES[0];
export const DEFAULT_SORT = MovieSort.RELEASE_DATE;
export const AVAILABLE_FORM_GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Science Fiction",
  "Crime",
  "Documentary",
];
export const MOVIES_API_URL = "http://localhost:4000/movies";
